export const estudio = {
  name: 'Max Costa',
  role: 'Estúdio digital freelance',
  tagline: 'Sites e produtos digitais para marcas que se levam a sério.',
  location: 'Rio de Janeiro · atende Brasil e exterior',
  yearsExp: 8,
  whatsapp: '5521976852478',
  whatsappDisplay: '(21) 97685-2478',
  email: 'ola@maxcosta.studio',
  instagram: 'https://instagram.com/maxcosta.studio',
  linkedin: 'https://linkedin.com/in/maxcostastudio',
  github: 'https://github.com/maxcosta',
} as const;

export const whatsappMsgDefault =
  'Olá Max! Vim pelo seu portfólio e queria conversar sobre um projeto.';
export const whatsappUrl = (msg = whatsappMsgDefault) =>
  `https://wa.me/${estudio.whatsapp}?text=${encodeURIComponent(msg)}`;

export type DemoSlug =
  | 'moda-arte'
  | 'restaurante-terra'
  | 'clinica-sereno'
  | 'motta-advogados'
  | 'costa-imoveis'
  | 'rota-clara';

export type Demo = {
  slug: DemoSlug;
  vertical: string;
  clientName: string;
  tagline: string;
  summary: string;
  accent: string;
  year: string;
  scope: string[];
  metrics: { label: string; value: string }[];
};

export const demos: Demo[] = [
  {
    slug: 'moda-arte',
    vertical: 'E-commerce',
    clientName: 'Moda & Arte',
    tagline: 'Loja de moda autoral',
    summary:
      'Catálogo com filtros, carrinho lateral, quantidade editável, cupom, cálculo de total e checkout mockado — tudo funcional no navegador.',
    accent: '#C6FF3B',
    year: '2025',
    scope: ['Catálogo dinâmico', 'Carrinho persistente', 'Cupom + total', 'Checkout mockado'],
    metrics: [
      { label: '1.8s', value: 'LCP no 4G' },
      { label: '741 KB', value: 'a página inteira' },
      { label: 'PIX', value: 'no checkout' },
    ],
  },
  {
    slug: 'restaurante-terra',
    vertical: 'Gastronomia',
    clientName: 'Terra Casa de Fogo',
    tagline: 'Restaurante de alta gastronomia',
    summary:
      'Menu em tabs por categoria, sistema de reserva com data, horário e número de pessoas, modal de confirmação e envio simulado.',
    accent: '#FF8A5C',
    year: '2025',
    scope: ['Menu em tabs', 'Reserva com calendário', 'Modal de confirmação', 'Envio simulado'],
    metrics: [
      { label: '1.7s', value: 'LCP no 4G' },
      { label: '397 KB', value: 'a página inteira' },
      { label: '24/7', value: 'reserva sem ligação' },
    ],
  },
  {
    slug: 'clinica-sereno',
    vertical: 'Saúde',
    clientName: 'Clínica Sereno',
    tagline: 'Clínica multiprofissional',
    summary:
      'Escolha do profissional, grade semanal com horários selecionáveis, form com validação e tela de confirmação — LGPD by design.',
    accent: '#3BE0B3',
    year: '2025',
    scope: ['Perfis dos profissionais', 'Grade de horários', 'Form validado', 'Confirmação'],
    metrics: [
      { label: '1.8s', value: 'LCP no 4G' },
      { label: '465 KB', value: 'a página inteira' },
      { label: '0', value: 'de layout shift' },
    ],
  },
  {
    slug: 'motta-advogados',
    vertical: 'Advocacia',
    clientName: 'Motta Advogados',
    tagline: 'Escritório de advocacia',
    summary:
      'Landing de autoridade com áreas de atuação, drawer explicativo, formulário de triagem em etapas e resumo do caso.',
    accent: '#A78BFA',
    year: '2025',
    scope: ['Áreas de atuação', 'Drawer detalhado', 'Triagem em etapas', 'Resumo do caso'],
    metrics: [
      { label: '1.2s', value: 'LCP no 4G' },
      { label: '489 KB', value: 'a página inteira' },
      { label: 'OAB', value: 'Prov. 205/2021' },
    ],
  },
  {
    slug: 'costa-imoveis',
    vertical: 'Imobiliária',
    clientName: 'Costa Imóveis',
    tagline: 'Vitrine imobiliária boutique',
    summary:
      'Busca por bairro, tipologia e faixa de preço em tempo real, ordenação, ficha do imóvel com galeria clicável e WhatsApp por imóvel.',
    accent: '#C6FF3B',
    year: '2025',
    scope: ['Filtros em tempo real', 'Grid responsivo', 'Ficha do imóvel', 'WhatsApp por imóvel'],
    metrics: [
      { label: '1.7s', value: 'LCP no 4G' },
      { label: '679 KB', value: 'a página inteira' },
      { label: 'Filtro', value: 'em tempo real' },
    ],
  },
  {
    slug: 'rota-clara',
    vertical: 'Infoproduto',
    clientName: 'Rota Clara',
    tagline: 'Curso online + landing de vendas',
    summary:
      'Landing de vendas com FAQ acordeão, contador de vagas real, seleção de plano e checkout mockado em 3 etapas — do lead ao "obrigado".',
    accent: '#5EEAD4',
    year: '2025',
    scope: ['FAQ acordeão', 'Contador de vagas', 'Seleção de plano', 'Checkout em etapas'],
    metrics: [
      { label: '1.8s', value: 'LCP no 4G' },
      { label: '735 KB', value: 'a página inteira' },
      { label: 'Checkout', value: 'em 3 etapas' },
    ],
  },
];

export const demoBySlug = Object.fromEntries(demos.map((d) => [d.slug, d])) as Record<
  DemoSlug,
  Demo
>;
