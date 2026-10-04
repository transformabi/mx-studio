import type { Locale } from '@/i18n/config';

/** Public address of this site; override per deploy with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mxstudioweb.com.br';

export const estudio = {
  name: 'MX Studio Web',
  owner: 'Max Costa',
  role: 'Estúdio digital freelance',
  tagline: 'Sites que trazem clientes para o seu negócio.',
  location: 'Rio de Janeiro · Brasil e exterior',
  whatsapp: '5521993196171',
  whatsappDisplay: '(21) 99319-6171',
  phoneE164: '+5521993196171',
  email: 'contato@mxstudioweb.com.br',
  instagram: 'https://www.instagram.com/mxstudioweb/',
  instagramHandle: '@mxstudioweb',
  linkedin: 'https://www.linkedin.com/company/145009011/',
  /** The free preview questionnaire (separate Vercel project with its own Supabase panel). */
  diagnostico: 'https://mx-studio-web.vercel.app/',
} as const;

/** Link to the diagnosis questionnaire in the page's language: it opens in Portuguese unless given ?lang=en|es. */
export const diagnosticoUrl = (locale: Locale) =>
  locale === 'pt' ? estudio.diagnostico : `${estudio.diagnostico}?lang=${locale}`;

export const whatsappMsgDefault = 'Olá! Vim pelo site da MX Studio Web e quero conversar sobre um site.';
export const whatsappUrl = (msg = whatsappMsgDefault) =>
  `https://wa.me/${estudio.whatsapp}?text=${encodeURIComponent(msg)}`;

export type DemoSlug =
  | 'moda-arte'
  | 'restaurante-terra'
  | 'clinica-sereno'
  | 'motta-advogados'
  | 'costa-imoveis'
  | 'rota-clara'
  | 'lumi-odonto'
  | 'iris-estetica'
  | 'alicerce-construtora'
  | 'mare-salao';

/** Business niches the demos are grouped by on the home page, in display order. */
export const niches = [
  'saude',
  'beleza',
  'advocacia',
  'lojas',
  'restaurantes',
  'imobiliarias',
  'construcao',
  'cursos',
] as const;
export type DemoNiche = (typeof niches)[number];

export type Demo = {
  slug: DemoSlug;
  niche: DemoNiche;
  vertical: string;
  clientName: string;
  tagline: string;
  summary: string;
  accent: string;
  year: string;
  scope: string[];
};

export const demos: Demo[] = [
  {
    slug: 'moda-arte',
    niche: 'lojas',
    vertical: 'E-commerce',
    clientName: 'Moda & Arte',
    tagline: 'Loja de moda autoral',
    summary:
      'Catálogo com filtros, carrinho lateral, quantidade editável, cupom, cálculo de total e checkout mockado — tudo funcional no navegador.',
    accent: '#C6FF3B',
    year: '2025',
    scope: ['Catálogo dinâmico', 'Carrinho persistente', 'Cupom + total', 'Checkout mockado'],
  },
  {
    slug: 'restaurante-terra',
    niche: 'restaurantes',
    vertical: 'Gastronomia',
    clientName: 'Terra Casa de Fogo',
    tagline: 'Restaurante de alta gastronomia',
    summary:
      'Menu em tabs por categoria, sistema de reserva com data, horário e número de pessoas, modal de confirmação e envio simulado.',
    accent: '#FF8A5C',
    year: '2025',
    scope: ['Menu em tabs', 'Reserva com calendário', 'Modal de confirmação', 'Envio simulado'],
  },
  {
    slug: 'clinica-sereno',
    niche: 'saude',
    vertical: 'Saúde',
    clientName: 'Clínica Sereno',
    tagline: 'Clínica multiprofissional',
    summary:
      'Escolha do profissional, grade semanal com horários selecionáveis, form com validação e tela de confirmação — LGPD by design.',
    accent: '#3BE0B3',
    year: '2025',
    scope: ['Perfis dos profissionais', 'Grade de horários', 'Form validado', 'Confirmação'],
  },
  {
    slug: 'motta-advogados',
    niche: 'advocacia',
    vertical: 'Advocacia',
    clientName: 'Motta Advogados',
    tagline: 'Escritório de advocacia',
    summary:
      'Landing de autoridade com áreas de atuação, drawer explicativo, formulário de triagem em etapas e resumo do caso.',
    accent: '#A78BFA',
    year: '2025',
    scope: ['Áreas de atuação', 'Drawer detalhado', 'Triagem em etapas', 'Resumo do caso'],
  },
  {
    slug: 'costa-imoveis',
    niche: 'imobiliarias',
    vertical: 'Imobiliária',
    clientName: 'Costa Imóveis',
    tagline: 'Vitrine imobiliária boutique',
    summary:
      'Busca por bairro, tipologia e faixa de preço em tempo real, ordenação, ficha do imóvel com galeria clicável e WhatsApp por imóvel.',
    accent: '#C6FF3B',
    year: '2025',
    scope: ['Filtros em tempo real', 'Grid responsivo', 'Ficha do imóvel', 'WhatsApp por imóvel'],
  },
  {
    slug: 'rota-clara',
    niche: 'cursos',
    vertical: 'Infoproduto',
    clientName: 'Rota Clara',
    tagline: 'Curso online + landing de vendas',
    summary:
      'Landing de vendas com FAQ acordeão, contador de vagas real, seleção de plano e checkout mockado em 3 etapas — do lead ao "obrigado".',
    accent: '#5EEAD4',
    year: '2025',
    scope: ['FAQ acordeão', 'Contador de vagas', 'Seleção de plano', 'Checkout em etapas'],
  },
  {
    slug: 'lumi-odonto',
    niche: 'saude',
    vertical: 'Odontologia',
    clientName: 'Lumi Odontologia',
    tagline: 'Clínica odontológica estética',
    summary:
      'Simulador interativo de clareamento, tratamentos em abas, equipe com CRO e agendamento guiado em 3 passos.',
    accent: '#7DD3FC',
    year: '2026',
    scope: ['Simulador de clareamento', 'Tratamentos em abas', 'Equipe e CRO', 'Agendamento guiado'],
  },
  {
    slug: 'iris-estetica',
    niche: 'beleza',
    vertical: 'Estética',
    clientName: 'Íris Estética Avançada',
    tagline: 'Clínica de estética avançada',
    summary:
      'Protocolos filtráveis por área, quiz de avaliação com recomendação, montador de pacotes com preço em tempo real e reserva.',
    accent: '#F0ABFC',
    year: '2026',
    scope: ['Quiz de avaliação', 'Protocolos por área', 'Pacotes de sessões', 'Reserva online'],
  },
  {
    slug: 'mare-salao',
    niche: 'beleza',
    vertical: 'Salão de beleza',
    clientName: 'Maré Salão',
    tagline: 'Salão com agendamento online',
    summary:
      'Serviços por categoria com preço e duração somados na hora, escolha da profissional, dias e horários livres e confirmação.',
    accent: '#F2B5A0',
    year: '2026',
    scope: ['Serviços por categoria', 'Escolha da profissional', 'Horários livres', 'Resumo com total'],
  },
  {
    slug: 'alicerce-construtora',
    niche: 'construcao',
    vertical: 'Construtora',
    clientName: 'Alicerce Engenharia',
    tagline: 'Construtora e reformas',
    summary:
      'Simulador de orçamento por tipo, área e padrão, portfólio de obras com filtro, etapas da obra interativas e pedido de visita técnica.',
    accent: '#FBBF24',
    year: '2026',
    scope: ['Simulador de orçamento', 'Portfólio de obras', 'Etapas da obra', 'Visita técnica'],
  },
];

export const demoBySlug = Object.fromEntries(demos.map((d) => [d.slug, d])) as Record<
  DemoSlug,
  Demo
>;

/** The six demos with real photography, in display order. The other four stay off the showcase until they get photos. */
export const showcase = [
  'clinica-sereno',
  'motta-advogados',
  'moda-arte',
  'restaurante-terra',
  'costa-imoveis',
  'rota-clara',
] as const satisfies readonly DemoSlug[];
export type ShowcaseSlug = (typeof showcase)[number];
export const isShowcased = (slug: string): slug is ShowcaseSlug => (showcase as readonly string[]).includes(slug);

/**
 * LCP in seconds shown on the showcase cards: Google Lighthouse 12, mobile defaults (simulated 4G,
 * 4× slower CPU, no cache), worst of 3 runs rounded up to 0.1 s. Measured on the static export
 * (out/) served over local HTTP/2, 2026-10-04.
 */
export const lcpSeconds: Record<ShowcaseSlug, number> = {
  'clinica-sereno': 2.9,
  'motta-advogados': 2.9,
  'moda-arte': 2.7,
  'restaurante-terra': 2.8,
  'costa-imoveis': 2.6,
  'rota-clara': 3.4,
};

/** Starting prices in BRL; other currencies are converted at display time. */
export const services = [
  { key: 'landing', price: 3500 },
  { key: 'institucional', price: 4900 },
  { key: 'ecommerce', price: 9900 },
  { key: 'sistema', price: 16000 },
] as const;
export type ServiceKey = (typeof services)[number]['key'];

/** Real client sites that are live, shown in their niche ahead of the demos. */
export type CaseSlug = 'sulamita-estetica';

export type ClientCase = {
  slug: CaseSlug;
  niche: DemoNiche;
  clientName: string;
  url: string;
  image: string;
  accent: string;
  year: string;
};

export const clientCases: ClientCase[] = [
  {
    slug: 'sulamita-estetica',
    niche: 'beleza',
    clientName: 'Sulamita Nascimento',
    url: 'https://www.sulamitaestetica.pt/',
    image: '/shots/sulamita-desktop.webp',
    accent: '#E39A7B',
    year: '2026',
  },
];

/**
 * "Clientes fundadores" launch offer for small local businesses (page /fundadores).
 * Update `restantes` by hand as slots are taken; the page never invents scarcity.
 */
export const fundadores = {
  vagas: 5,
  restantes: 5,
  preco: 497,
  parcelas: 3,
  dominioAno: 40,
  cuidadoMes: 149.9,
  prazoDias: 7,
  whatsappMsg: 'Olá! Vi o Reels e quero uma vaga de cliente fundador para o meu negócio.',
  /** Sent instead of `whatsappMsg` once `restantes` reaches 0. */
  listaDeEsperaMsg: 'Olá! Vi que as vagas de cliente fundador acabaram e quero entrar na lista de espera para uma vaga.',
} as const;

/** Closing headline of /fundadores, singular or plural: "Resta 1 vaga" / "Restam 3 vagas". */
export function vagasRestantes(n: number) {
  return n === 1
    ? { verb: 'Resta', count: '1 vaga', tail: 'Ela pode ser sua.' }
    : { verb: 'Restam', count: `${n} vagas`, tail: 'Uma pode ser sua.' };
}
