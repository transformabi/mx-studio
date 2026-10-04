import { ArrowUpRight, BadgeCheck, Camera, Clock, MapPin, MessageCircle, Smartphone, Star, Video } from 'lucide-react';
import { clientCases, demoBySlug, estudio, fundadores as f, whatsappUrl } from '@/lib/estudio';
import { shots } from '@/lib/images';
import { pageMetadata } from '@/lib/seo';
import { ButtonLink } from '@/components/site/button-link';
import { SectionHeader } from '@/components/site/section-header';
import { ShowcaseCard } from '@/components/home/showcase-card';
import { Reveal } from '@/components/reveal';

// Campaign page for Reels and the Instagram bio: Portuguese only, out of search and of the main menu,
// so the launch price never sits next to the regular price table. It still gets a canonical and a share
// image, since the link is sent around on WhatsApp and Instagram.
export const metadata = pageMetadata({
  locale: 'pt',
  path: '/fundadores',
  title: 'Clientes fundadores · MX Studio Web',
  description: `Site profissional para pequenos negócios do Rio por R$ ${f.preco}. ${f.vagas} vagas de lançamento.`,
  index: false,
  translated: false,
});

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);

const included = [
  { icon: Smartphone, title: 'Site de uma página', text: 'Bonito e rápido no celular, onde o seu cliente está.' },
  { icon: MessageCircle, title: 'Botão de WhatsApp', text: 'Em todo o site, com a mensagem já escrita.' },
  { icon: MapPin, title: 'Mapa e horários', text: 'Como chegar, telefone e horário de funcionamento.' },
  { icon: Star, title: 'Serviços ou cardápio', text: 'Com preços, do jeito que você atende.' },
  { icon: Camera, title: 'Suas fotos e logo', text: 'O seu negócio de verdade, não banco de imagem.' },
  { icon: Clock, title: `Pronto em até ${f.prazoDias} dias`, text: 'Contados a partir de quando você manda fotos e textos.' },
];

const exchange = [
  { icon: Video, title: 'Um depoimento em vídeo', text: 'Uns 30 segundos, gravado no celular, contando como foi.' },
  { icon: BadgeCheck, title: 'Autorização para o portfólio', text: 'O seu site aparece no meu portfólio como cliente real.' },
  { icon: Star, title: 'Uma avaliação no Google', text: 'Se você gostou do resultado.' },
];

const niches = ['Padaria', 'Salão', 'Barbearia', 'Oficina', 'Loja de bairro', 'Restaurante', 'Pet shop', 'Estética', 'Academia', 'Açaí e lanchonete'];

const requirements = [
  'O negócio já está funcionando, com endereço ou atendimento ativo.',
  'Você manda logo e fotos do espaço, dos produtos ou dos serviços.',
  'Você responde as mensagens do projeto em até 2 dias.',
];

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

const exampleDemos = ['restaurante-terra', 'moda-arte'] as const;

export default function FundadoresPage() {
  const whatsapp = whatsappUrl(f.whatsappMsg);
  const sulamita = clientCases[0];

  return (
    <main className="font-body">
      <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)]"
        />
        <div className="container-site relative">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-white/55">Clientes fundadores · Rio de Janeiro</p>
          <h1 className="mt-6 max-w-4xl text-balance font-brand text-[clamp(2.5rem,5vw+1rem,5.25rem)] font-bold leading-[0.97] tracking-[-0.035em]">
            Um site profissional para o seu negócio por <span className="text-lime">{brl(f.preco)}</span>.
          </h1>
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
            <p className="max-w-2xl text-lg leading-relaxed text-white/70 lg:col-span-7">
              Estou abrindo {f.vagas} vagas de lançamento para pequenos negócios do Rio. Você ganha um site pronto para receber
              clientes pelo WhatsApp. Eu ganho um caso real no meu portfólio.
            </p>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <ButtonLink href={whatsapp} external>
                <MessageCircle className="h-4 w-4" aria-hidden />
                Quero minha vaga
              </ButtonLink>
              <ButtonLink href="#exemplos" variant="outline">
                Ver exemplos
              </ButtonLink>
            </div>
          </div>
          <dl className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            <Stat value={brl(f.preco)} label={`no PIX ou em até ${f.parcelas}x no cartão`} />
            <Stat value={`${f.restantes} de ${f.vagas}`} label="vagas abertas" />
            <Stat value={`~${brl(f.dominioAno)}/ano`} label="domínio no seu nome, pago direto ao registro.br" />
          </dl>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 sm:py-28">
        <div className="container-site">
          <SectionHeader index="01" label="O que está incluso" title="Tudo o que um pequeno negócio precisa na internet." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((it) => (
              <li key={it.title} className="bg-ink p-7">
                <it.icon className="h-5 w-5 text-lime" aria-hidden />
                <h3 className="mt-6 font-brand text-lg font-bold">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{it.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/45">Hospedagem sem mensalidade. Uma rodada de ajustes depois da prévia.</p>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-label text-xs uppercase tracking-[0.16em] text-ink/55">
              <span className="text-ink">02</span> — O que eu peço em troca
            </p>
            <h2 className="mt-6 font-brand text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.02] tracking-[-0.025em]">
              Um preço de lançamento em troca de confiança.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              O valor é baixo porque o seu site vai mostrar a outros negócios como eu trabalho. Por isso, peço três coisas
              simples quando ele estiver no ar.
            </p>
          </div>
          <ul className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-7">
            {exchange.map((it) => (
              <li key={it.title} className="flex gap-5 py-6">
                <it.icon className="mt-1 h-5 w-5 shrink-0" aria-hidden />
                <div>
                  <h3 className="font-brand text-lg font-bold">{it.title}</h3>
                  <p className="mt-1 text-ink/70">{it.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-label text-xs uppercase tracking-[0.16em] text-white/50">
              <span className="text-lime">03</span> — Para quem é
            </p>
            <h2 className="mt-6 font-brand text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.02] tracking-[-0.025em]">
              Negócios de bairro que atendem gente de verdade.
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {niches.map((n) => (
                <li key={n} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/80">
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-2 p-7 lg:col-span-6">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">Para garantir a vaga</p>
            <ul className="mt-5 space-y-3 text-white/80">
              {requirements.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="exemplos" className="border-t border-white/10 py-24 sm:py-28">
        <div className="container-site">
          <SectionHeader
            index="04"
            label="Exemplos"
            title="Um cliente real e modelos que você pode testar."
            lead="Toque para abrir. Os modelos funcionam de verdade: dá para montar um pedido, testar os botões, ver tudo no celular."
          />
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
            <Reveal className="md:col-span-2">
              <ShowcaseCard
                href={sulamita.url}
                external
                image={shots.sulamita.desktop}
                alt="Página inicial do site da Sulamita Nascimento"
                label="Cliente real · Estética · Portugal"
                title={sulamita.clientName}
                text="Site bilíngue, no ar desde setembro de 2026 em sulamitaestetica.pt."
                cta="Ver no ar"
              />
            </Reveal>
            {exampleDemos.map((slug, i) => (
              <Reveal key={slug} delay={i * 80}>
                <ShowcaseCard
                  href={`/demo/${slug}`}
                  image={shots.demos[slug]}
                  alt={`Página inicial do modelo ${demoBySlug[slug].clientName}`}
                  label="Modelo de demonstração"
                  title={demoBySlug[slug].clientName}
                  text={demoBySlug[slug].tagline}
                  cta="Abrir"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink sm:py-28">
        <div className="container-site">
          <SectionHeader tone="light" index="05" label="Como funciona" title="Do WhatsApp ao site no ar em 4 passos." />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-paper p-7">
                <span className="font-label text-xs text-ink/50">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-8 font-brand text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-xl border border-ink/10 p-7">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-ink/55">Depois de pronto · opcional</p>
            <p className="mt-2 font-brand text-xl font-bold">Plano de cuidado por {brl(f.cuidadoMes)}/mês</p>
            <p className="mt-1 max-w-xl text-ink/70">
              Eu atualizo preços, fotos e horários quando você pedir pelo WhatsApp. Não é obrigatório: o site é seu.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container-site">
          <SectionHeader index="06" label="Perguntas" title="O que perguntam antes de pegar a vaga." />
          <div className="mt-14 divide-y divide-white/10 border-y border-white/10 lg:ml-[25%]">
            {faq.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary className="flex items-start justify-between gap-6 py-6 font-brand text-lg font-semibold">
                  {item.q}
                  <span className="faq-icon mt-0.5 text-xl leading-none text-white/50 transition-transform duration-300" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-white/65">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 text-center sm:py-28">
        <div className="container-site">
          <h2 className="mx-auto max-w-3xl text-balance font-brand text-[clamp(2.25rem,4vw+1rem,4rem)] font-bold leading-[1] tracking-[-0.03em]">
            {f.restantes > 0 ? (
              <>
                Restam <span className="text-lime">{f.restantes} vagas</span>. Uma pode ser sua.
              </>
            ) : (
              'As vagas de fundador acabaram.'
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/60">Me chama no WhatsApp com o nome do seu negócio. Respondo em até 24 horas.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={whatsapp} external>
              <MessageCircle className="h-4 w-4" aria-hidden />
              Quero minha vaga
            </ButtonLink>
            <ButtonLink href={estudio.instagram} external variant="outline">
              {estudio.instagramHandle}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-brand text-3xl font-bold tracking-tight sm:text-4xl">{value}</dd>
      <dd className="mt-1 text-xs text-white/50">{label}</dd>
    </div>
  );
}
