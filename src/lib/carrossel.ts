import { SITE_HOST } from './estudio';

export type Slide = {
  n: number;
  kind: 'cover' | 'setup' | 'case' | 'why' | 'cta';
  title?: string;
  hook?: string;
  hookAccent?: string;
  hookAccent2?: string;
  hookTail?: string;
  body?: string;
  caseName?: string;
  caseCategory?: string;
  caseMetric?: string;
  caseMetricLabel?: string;
  caseTagline?: string;
  caseImage?: string;
  caseAccent?: string;
};

export const slides: Slide[] = [
  {
    n: 1,
    kind: 'cover',
    hook: '6 sites.',
    hookAccent: '+R$ 2 milhões',
    hookAccent2: 'faturados.',
    hookTail: 'Zero template.',
    body: 'Swipe pra ver os cases →',
  },
  {
    n: 2,
    kind: 'setup',
    title: '"Faz um site simples pra economizar."',
    body: 'E aí perde cliente todo dia\nsem saber por quê.',
  },
  {
    n: 3,
    kind: 'case',
    caseName: 'Vestir&Co.',
    caseCategory: 'E-commerce · Moda autoral',
    caseMetric: '+184%',
    caseMetricLabel: 'em conversão',
    caseTagline: 'Vendia por WhatsApp com planilha no colo.\nHoje o site vende sozinho.',
    caseImage: '/heros/moda-arte.webp',
    caseAccent: '#94E421',
  },
  {
    n: 4,
    kind: 'case',
    caseName: 'Terra Casa de Fogo',
    caseCategory: 'Gastronomia · Alta cozinha',
    caseMetric: '+68%',
    caseMetricLabel: 'em reservas',
    caseTagline: 'Sem contratar\nmais um atendente.',
    caseImage: '/heros/restaurante-terra.webp',
    caseAccent: '#ff8a5c',
  },
  {
    n: 5,
    kind: 'case',
    caseName: 'Clínica Sereno',
    caseCategory: 'Saúde · Psicologia + Nutrição',
    caseMetric: '−52%',
    caseMetricLabel: 'no no-show',
    caseTagline: 'Paciente marca sozinho.\nSistema lembra antes.',
    caseImage: '/heros/clinica-sereno.webp',
    caseAccent: '#3be0b3',
  },
  {
    n: 6,
    kind: 'case',
    caseName: 'Motta Advogados',
    caseCategory: 'Advocacia · Direito empresarial',
    caseMetric: '+240%',
    caseMetricLabel: 'leads qualificados',
    caseTagline: 'Cliente já chega pré-triado,\nsabendo quanto vai investir.',
    caseImage: '/heros/motta-advogados.webp',
    caseAccent: '#a78bfa',
  },
  {
    n: 7,
    kind: 'case',
    caseName: 'Costa Imóveis',
    caseCategory: 'Imobiliária · Vitrine boutique',
    caseMetric: '−58%',
    caseMetricLabel: 'custo por lead',
    caseTagline: 'Deixou de pagar\nZap e VivaReal.',
    caseImage: '/heros/costa-imoveis.webp',
    caseAccent: '#94E421',
  },
  {
    n: 8,
    kind: 'case',
    caseName: 'Método Rota Clara',
    caseCategory: 'Infoproduto · Curso online',
    caseMetric: 'R$ 187k',
    caseMetricLabel: 'em 9 dias',
    caseTagline: 'Landing certa, checkout certo,\n92% de retenção em 30 dias.',
    caseImage: '/heros/rota-clara.webp',
    caseAccent: '#22d3ee',
  },
  {
    n: 9,
    kind: 'why',
    title: 'Por que R$ 10k\ne não R$ 2k?',
    body: 'Porque não é o mesmo produto.',
  },
  {
    n: 10,
    kind: 'cta',
    hook: 'Seu site pode ser\no próximo case.',
    body: SITE_HOST,
    hookTail: '3 vagas em outubro',
  },
];

export const slideBySlug = Object.fromEntries(
  slides.map((s) => [String(s.n), s]),
) as Record<string, Slide>;
