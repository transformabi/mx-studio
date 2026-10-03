import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ArrowUpRight, BadgeCheck, Camera, Clock, MapPin, MessageCircle, MousePointerClick, Smartphone, Star, Video } from 'lucide-react';

import { EstudioBtn } from '@/components/btn';
import { FaqAccordion } from '@/components/faq-accordion';
import { Reveal } from '@/components/reveal';
import { WorkCard, type WorkItem } from '@/components/work-card';
import { hasDemoArt } from '@/components/demo-art';
import { demoKeywords, heros } from '@/lib/demo-images';
import { clientCases, demos, estudio, fundadores as f, whatsappUrl } from '@/lib/estudio';
import { fill } from '@/i18n/format';
import { messages } from '@/i18n/messages';

// Campaign page for Reels and the Instagram bio: Portuguese only, kept out of search and of the main nav
// so the launch price never sits next to the regular price table.
export const metadata: Metadata = {
  title: 'Clientes fundadores',
  description: `Site profissional para pequenos negócios do Rio por R$ ${f.preco}. ${f.vagas} vagas de lançamento.`,
  robots: { index: false, follow: false },
};

const brl = (n: number) =>
  `R$ ${n.toLocaleString('pt-BR', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

const included = [
  { icon: Smartphone, title: 'Site de uma página', text: 'Bonito e rápido no celular, onde seu cliente está.' },
  { icon: MessageCircle, title: 'Botão de WhatsApp', text: 'Em todo o site, com a mensagem já escrita.' },
  { icon: MapPin, title: 'Mapa e horários', text: 'Como chegar, telefone e horário de funcionamento.' },
  { icon: Star, title: 'Serviços ou cardápio', text: 'Com preços, do jeito que você atende.' },
  { icon: Camera, title: 'Suas fotos e logo', text: 'Seu negócio de verdade, não banco de imagem.' },
  { icon: Clock, title: `Pronto em até ${f.prazoDias} dias`, text: 'Contados a partir de quando você manda fotos e textos.' },
];

const exchange = [
  { icon: Video, title: 'Um depoimento em vídeo', text: 'Uns 30 segundos, gravado no celular, contando como foi.' },
  { icon: BadgeCheck, title: 'Autorização para o portfólio', text: 'Seu site aparece no meu portfólio como cliente real.' },
  { icon: Star, title: 'Uma avaliação no Google', text: 'Se você gostou do resultado.' },
];

const niches = ['Padaria', 'Salão', 'Barbearia', 'Oficina', 'Loja de bairro', 'Restaurante', 'Pet shop', 'Estética', 'Academia', 'Açaí e lanchonete'];

const steps = [
  { title: 'Você chama no WhatsApp', text: 'Me conta qual é o negócio. Se tiver vaga, ela é sua.' },
  { title: 'Responde o diagnóstico', text: '5 minutos de perguntas rápidas e o envio de logo e fotos.' },
  { title: 'Eu monto e mando a prévia', text: 'Você vê o site funcionando antes de ir ao ar.' },
  { title: 'Ajustes e no ar', text: 'Uma rodada de ajustes e o site entra no ar com o seu domínio.' },
];

const faq = [
  {
    q: `Por que só ${brl(f.preco)}?`,
    a: 'Porque estou montando meu portfólio com negócios reais. Em troca do preço de lançamento, peço um depoimento, a autorização para mostrar o site e uma avaliação no Google. Quando as vagas acabarem, o preço volta ao normal.',
  },
  {
    q: 'O domínio (seunegocio.com.br) fica no meu nome?',
    a: `Fica. Você registra no registro.br com o seu CPF ou CNPJ e paga direto a eles, cerca de ${brl(f.dominioAno)} por ano. Eu te ajudo no passo a passo e cuido da configuração. O endereço é seu, sem depender de mim.`,
  },
  {
    q: 'Tem mensalidade?',
    a: `Não é obrigatória. A hospedagem não tem mensalidade. Se quiser que eu cuide das alterações depois (preço, foto, horário), existe um plano opcional de ${brl(f.cuidadoMes)} por mês.`,
  },
  {
    q: 'Quanto tempo leva?',
    a: `Até ${f.prazoDias} dias depois que você manda as fotos e as informações do negócio. Quanto antes chegar o material, antes fica pronto.`,
  },
  {
    q: 'Já tenho Instagram. Preciso de site?',
    a: 'O Instagram é ótimo para quem já te segue. O site é o endereço fixo para mandar no WhatsApp, colocar no Google Maps e na bio, com tudo num lugar só: serviços, preços, localização e o botão para chamar.',
  },
  {
    q: 'Como eu pago?',
    a: `${brl(f.preco)} no PIX ou em até ${f.parcelas}x no cartão. O pagamento é combinado depois que eu confirmar a sua vaga.`,
  },
];

export default function FundadoresPage() {
  const t = messages.pt;
  const whatsapp = whatsappUrl(f.whatsappMsg);
  const taken = f.vagas - f.restantes;

  const caseItems: WorkItem[] = clientCases.map((cs) => ({
    kind: 'case',
    key: cs.slug,
    niche: cs.niche,
    href: cs.url,
    name: cs.clientName,
    accent: cs.accent,
    year: cs.year,
    text: t.work.clients[cs.slug],
    openLabel: fill(t.work.visitSite, { name: cs.clientName }),
    image: cs.image,
    badge: t.work.clientBadge,
  }));
  const demoItems: WorkItem[] = demos
    .filter((d) => ['mare-salao', 'restaurante-terra', 'moda-arte'].includes(d.slug))
    .map((d) => ({
      kind: 'demo',
      key: d.slug,
      niche: d.niche,
      href: `/demo/${d.slug}`,
      name: d.clientName,
      accent: d.accent,
      year: d.year,
      text: t.work.cards[d.slug],
      openLabel: fill(t.work.openDemo, { name: d.clientName }),
      image: heros[d.slug],
      artSlug: hasDemoArt(d.slug) ? d.slug : undefined,
      keyword: hasDemoArt(d.slug) ? undefined : demoKeywords[d.slug],
    }));

  return (
    <div className="font-body">
      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(148,228,33,0.18),transparent),radial-gradient(ellipse_50%_40%_at_100%_10%,rgba(47,107,12,0.28),transparent)]"
        />
        <div className="container-wide">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-label text-[11px] uppercase tracking-[0.12em] text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              Clientes fundadores · Rio de Janeiro
            </div>
          </Reveal>

          <h1 className="mt-8 max-w-4xl text-balance font-brand text-[clamp(2.5rem,6vw+0.5rem,6rem)] font-extrabold leading-[0.95] tracking-tight text-white">
            Um site profissional pro seu negócio por <span className="text-lime">{brl(f.preco)}</span>.
          </h1>

          <div className="mt-8 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="max-w-2xl text-lg leading-relaxed text-white/70">
                Estou abrindo {f.vagas} vagas de lançamento para pequenos negócios do Rio. Você ganha um site pronto
                para receber clientes pelo WhatsApp. Eu ganho um caso real no meu portfólio.
              </p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5 lg:justify-self-end">
              <div className="flex flex-wrap items-center gap-3">
                <EstudioBtn href={whatsapp} external variant="lime">
                  <MessageCircle className="h-4 w-4" />
                  Quero minha vaga
                </EstudioBtn>
                <EstudioBtn href="#exemplos" variant="secondary">
                  Ver exemplos
                  <ArrowUpRight className="h-4 w-4" />
                </EstudioBtn>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              <Stat value={brl(f.preco)} label={`no PIX ou em até ${f.parcelas}x no cartão`} />
              <Stat value={`${f.restantes} de ${f.vagas}`} label={taken ? 'vagas ainda abertas' : 'vagas abertas'} />
              <Stat value={`~${brl(f.dominioAno)}/ano`} label="domínio no seu nome, pago direto ao registro.br" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* INCLUSO */}
      <section className="border-t border-white/10 bg-white/2 py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <Eyebrow>O que está incluso</Eyebrow>
            <h2 className={h2}>
              Tudo o que um pequeno negócio <span className="text-white/50">precisa na internet</span>.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((it, i) => (
              <Reveal key={it.title} delay={(i % 3) * 60}>
                <Feature icon={it.icon} title={it.title} text={it.text} />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/45">
            Hospedagem sem mensalidade. Uma rodada de ajustes depois da prévia.
          </p>
        </div>
      </section>

      {/* EM TROCA */}
      <section className="py-20 sm:py-28">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>O que eu peço em troca</Eyebrow>
            <h2 className={h2}>
              Um preço de lançamento <span className="text-lime">em troca de confiança</span>.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              O valor é baixo porque o seu site vai mostrar a outros negócios como eu trabalho. Por isso, peço três coisas
              simples quando ele estiver no ar.
            </p>
          </Reveal>
          <div className="space-y-4 lg:col-span-7">
            {exchange.map((it, i) => (
              <Reveal key={it.title} delay={i * 80}>
                <Feature icon={it.icon} title={it.title} text={it.text} horizontal />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRA QUEM É */}
      <section className="border-t border-white/10 bg-white/2 py-20 sm:py-28">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Pra quem é</Eyebrow>
            <h2 className={h2}>Negócios de bairro que atendem gente de verdade.</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {niches.map((n) => (
                <li key={n} className="rounded-full border border-white/15 bg-white/3 px-3.5 py-1.5 text-sm text-white/80">
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6">
            <div className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
              <div className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">Para garantir a vaga</div>
              <ul className="mt-5 space-y-3 text-sm text-white/80">
                {[
                  'O negócio já está funcionando, com endereço ou atendimento ativo.',
                  'Você manda logo e fotos do espaço, dos produtos ou dos serviços.',
                  'Você responde as mensagens do projeto em até 2 dias.',
                ].map((r) => (
                  <li key={r} className="flex items-start gap-2.5">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXEMPLOS */}
      <section id="exemplos" className="py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <Eyebrow>Exemplos</Eyebrow>
            <h2 className={h2}>
              Um cliente real <span className="text-white/50">e modelos que você pode testar</span>.
            </h2>
            <p className="mt-5 max-w-xl text-base text-white/60">
              Toque para abrir. Os modelos funcionam de verdade: dá para montar um pedido, escolher horário, testar os botões.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[...caseItems, ...demoItems].map((it, i) => (
              <WorkCard key={it.key} item={it} number={`${t.work.number} ${String(i).padStart(2, '0')}`} />
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-t border-white/10 bg-white/2 py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <Eyebrow>Como funciona</Eyebrow>
            <h2 className={h2}>Do WhatsApp ao site no ar em 4 passos.</h2>
          </Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 60} className="h-full rounded-3xl border border-white/10 bg-white/3 p-6">
                <span className="font-label text-xs text-lime">{String(i + 1).padStart(2, '0')}</span>
                <div className="mt-3 font-brand text-xl font-bold text-white">{s.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <div className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">Depois de pronto · opcional</div>
                <div className="mt-1 font-brand text-xl font-bold text-white">Plano de cuidado por {brl(f.cuidadoMes)}/mês</div>
                <p className="mt-1 max-w-xl text-sm text-white/60">
                  Eu atualizo preços, fotos e horários quando você pedir pelo WhatsApp. Não é obrigatório: o site é seu.
                </p>
              </div>
              <MousePointerClick className="hidden h-10 w-10 shrink-0 text-white/20 sm:block" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-wide py-20 sm:py-28">
        <Reveal>
          <Eyebrow>Perguntas</Eyebrow>
          <h2 className={h2}>O que perguntam antes de pegar a vaga.</h2>
        </Reveal>
        <FaqAccordion items={faq} />
      </section>

      {/* CTA FINAL */}
      <section className="relative isolate overflow-hidden border-t border-white/10 py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(148,228,33,0.14),transparent)]"
        />
        <div className="container-wide text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-balance font-brand text-[clamp(2.25rem,4.5vw+0.5rem,4rem)] font-extrabold leading-[1] tracking-tight text-white">
              {f.restantes > 0 ? (
                <>
                  Restam <span className="text-lime">{f.restantes} vagas</span>. Uma pode ser sua.
                </>
              ) : (
                'As vagas de fundador acabaram.'
              )}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/60">
              Me chama no WhatsApp com o nome do seu negócio. Eu respondo em até 24 horas.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <EstudioBtn href={whatsapp} external variant="lime">
                <MessageCircle className="h-4 w-4" />
                Quero minha vaga
              </EstudioBtn>
              <EstudioBtn href={estudio.instagram} external variant="secondary">
                @mxstudioweb
                <ArrowUpRight className="h-4 w-4" />
              </EstudioBtn>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

const h2 = 'mt-4 max-w-3xl text-balance font-brand text-[clamp(2.25rem,4.5vw+0.5rem,4rem)] font-extrabold leading-[1] tracking-tight text-white';

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 font-label text-[11px] uppercase tracking-[0.16em] text-white/50">
      <span className="h-px w-8 bg-lime" />
      {children}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-brand text-3xl font-extrabold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-xs text-white/50">{label}</div>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
  horizontal,
}: {
  icon: typeof Star;
  title: string;
  text: string;
  horizontal?: boolean;
}) {
  return (
    <div className={`flex h-full gap-4 rounded-3xl border border-white/10 bg-white/3 p-6 ${horizontal ? 'items-start' : 'flex-col'}`}>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lime/15 text-lime">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="font-brand text-lg font-bold text-white">{title}</div>
        <p className="mt-1 text-sm leading-relaxed text-white/60">{text}</p>
      </div>
    </div>
  );
}
