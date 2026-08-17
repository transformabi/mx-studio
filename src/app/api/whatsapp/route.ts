/**
 * Webhook da WhatsApp Cloud API.
 *
 * GET  — handshake de verificação exigido pela Meta ao cadastrar a URL.
 * POST — recebe mensagens, responde com o atendente e avisa o Max.
 *
 * Variáveis de ambiente necessárias (Vercel → Settings → Environment Variables):
 *   ANTHROPIC_API_KEY        chave da Anthropic
 *   WHATSAPP_TOKEN           token permanente do app da Meta
 *   WHATSAPP_PHONE_ID        Phone Number ID (não é o telefone, é o ID numérico)
 *   WHATSAPP_VERIFY_TOKEN    string que você inventa e repete no painel da Meta
 *   WHATSAPP_APP_SECRET      App Secret, para validar a assinatura
 *   BOOKING_URL              link do Cal.com/Calendly (opcional — sem ele o
 *                            agente encerra com "o Max retorna" em vez de agendar)
 *   UPSTASH_REDIS_REST_URL   histórico das conversas
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * Aviso de novo lead (opcional, mas recomendado):
 *   RESEND_API_KEY           chave da Resend
 *   OWNER_EMAIL              para onde mandar o aviso
 *   ALERT_FROM               remetente verificado na Resend, ex.: bot@maxcosta.studio
 *
 * O aviso vai por e-mail de propósito. Mandar para o WhatsApp pessoal do Max
 * exigiria um template aprovado pela Meta: fora da janela de 24h a Cloud API
 * recusa mensagem livre iniciada pela empresa (erro 131047).
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import { Redis } from '@upstash/redis';
import { HISTORY_LIMIT, reply, type Turn } from '@/lib/whatsapp-agent';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GRAPH = 'https://graph.facebook.com/v21.0';
const redis = Redis.fromEnv();

/** Conversa expira em 30 dias sem mensagem. */
const TTL_SECONDS = 60 * 60 * 24 * 30;

const key = (waId: string) => `wa:conv:${waId}`;
const ownerKey = (waId: string) => `wa:notified:${waId}`;
const seenKey = (messageId: string) => `wa:seen:${messageId}`;

/**
 * A Meta reenvia o webhook quando não recebe 200 rápido. Sem essa trava a
 * mesma mensagem gera respostas duplicadas.
 */
async function alreadyHandled(messageId: string): Promise<boolean> {
  const first = await redis.set(seenKey(messageId), 1, { nx: true, ex: 60 * 60 });
  return first === null;
}

function signatureIsValid(raw: string, header: string | null): boolean {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret || !header?.startsWith('sha256=')) return false;

  const expected = 'sha256=' + createHmac('sha256', secret).update(raw).digest('hex');
  const a = Buffer.from(header);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function sendText(to: string, body: string): Promise<void> {
  const res = await fetch(`${GRAPH}/${process.env.WHATSAPP_PHONE_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { preview_url: false, body },
    }),
  });

  if (!res.ok) {
    console.error('[whatsapp] falha ao enviar', res.status, await res.text());
  }
}

/**
 * Avisa o Max uma vez por lead, por e-mail. É aviso, não chamado: o agente segue
 * a conversa sozinho. Serve para o Max acompanhar e entrar só quando quiser.
 */
async function notifyOwner(waId: string, profileName: string | undefined, firstMessage: string) {
  const { RESEND_API_KEY, OWNER_EMAIL, ALERT_FROM } = process.env;
  if (!RESEND_API_KEY || !OWNER_EMAIL || !ALERT_FROM) return;

  const first = await redis.set(ownerKey(waId), 1, { nx: true, ex: TTL_SECONDS });
  if (first === null) return;

  const quem = profileName ? `${profileName} (+${waId})` : `+${waId}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: ALERT_FROM,
      to: [OWNER_EMAIL],
      subject: `Novo lead no WhatsApp: ${quem}`,
      text: [
        `${quem} começou uma conversa.`,
        '',
        `Primeira mensagem: "${firstMessage.slice(0, 500)}"`,
        '',
        'O atendente já está respondendo. Entre só se quiser assumir.',
        `Abrir conversa: https://wa.me/${waId}`,
      ].join('\n'),
    }),
  });

  if (!res.ok) {
    console.error('[whatsapp] falha ao avisar', res.status, await res.text());
  }
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  if (
    params.get('hub.mode') === 'subscribe' &&
    params.get('hub.verify_token') === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    return new Response(params.get('hub.challenge') ?? '', { status: 200 });
  }

  return new Response('forbidden', { status: 403 });
}

export async function POST(request: Request) {
  const raw = await request.text();

  if (!signatureIsValid(raw, request.headers.get('x-hub-signature-256'))) {
    return new Response('invalid signature', { status: 401 });
  }

  // Responder 200 sempre: erro aqui faz a Meta reenviar em loop.
  try {
    const value = JSON.parse(raw)?.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];

    // Recibos de entrega e leitura também chegam aqui — ignorar.
    if (!message || message.type !== 'text') {
      return new Response('ok', { status: 200 });
    }

    if (await alreadyHandled(message.id)) {
      return new Response('ok', { status: 200 });
    }

    const waId: string = message.from;
    const incoming: string = message.text.body;
    const profileName: string | undefined = value?.contacts?.[0]?.profile?.name;

    const history = ((await redis.get<Turn[]>(key(waId))) ?? []).slice(-HISTORY_LIMIT);
    history.push({ role: 'user', content: incoming });

    if (history.length === 1) {
      await notifyOwner(waId, profileName, incoming);
    }

    const answer = await reply(history);
    history.push({ role: 'assistant', content: answer });

    await redis.set(key(waId), history.slice(-HISTORY_LIMIT), { ex: TTL_SECONDS });
    await sendText(waId, answer);
  } catch (error) {
    console.error('[whatsapp] erro no processamento', error);
  }

  return new Response('ok', { status: 200 });
}
