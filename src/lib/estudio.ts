export const estudio = {
  name: 'MX Studio',
  role: 'Estúdio digital freelance',
  tagline: 'Sites e produtos digitais para marcas que se levam a sério.',
  location: 'Rio de Janeiro · atende Brasil e exterior',
  yearsExp: 8,
  whatsapp: '5521993196171',
  whatsappDisplay: '(21) 99319-6171',
  email: 'developermaxrj@gmail.com',
  instagram: 'https://www.instagram.com/mxestudioweb/',
  linkedin: 'https://www.linkedin.com/company/145009011/',
  github: 'https://github.com/mxstudio',
} as const;

export const whatsappMsgDefault =
  'Olá! Vim pelo portfólio da MX Studio e queria conversar sobre um projeto.';
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
  | 'alicerce-construtora';

/** Filter groups on the home page. */
export type DemoGroup = 'saude' | 'local' | 'digital';

export type Demo = {
  slug: DemoSlug;
  group: DemoGroup;
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
    group: 'digital',
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
    group: 'local',
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
    group: 'saude',
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
    group: 'local',
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
    group: 'local',
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
    group: 'digital',
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
  {
    slug: 'lumi-odonto',
    group: 'saude',
    vertical: 'Odontologia',
    clientName: 'Lumi Odontologia',
    tagline: 'Clínica odontológica estética',
    summary:
      'Simulador interativo de clareamento, tratamentos em abas, equipe com CRO e agendamento guiado em 3 passos.',
    accent: '#7DD3FC',
    year: '2026',
    scope: ['Simulador de clareamento', 'Tratamentos em abas', 'Equipe e CRO', 'Agendamento guiado'],
    metrics: [
      { label: 'Simulador', value: 'de clareamento' },
      { label: 'Agenda', value: 'em 3 passos' },
      { label: 'CRO', value: 'responsável técnico' },
    ],
  },
  {
    slug: 'iris-estetica',
    group: 'saude',
    vertical: 'Estética',
    clientName: 'Íris Estética Avançada',
    tagline: 'Clínica de estética avançada',
    summary:
      'Protocolos filtráveis por área, quiz de avaliação com recomendação, montador de pacotes com preço em tempo real e reserva.',
    accent: '#F0ABFC',
    year: '2026',
    scope: ['Quiz de avaliação', 'Protocolos por área', 'Pacotes de sessões', 'Reserva online'],
    metrics: [
      { label: 'Quiz', value: 'de avaliação' },
      { label: 'Pacotes', value: 'preço em tempo real' },
      { label: 'Filtro', value: 'por área do corpo' },
    ],
  },
  {
    slug: 'alicerce-construtora',
    group: 'local',
    vertical: 'Construtora',
    clientName: 'Alicerce Engenharia',
    tagline: 'Construtora e reformas',
    summary:
      'Simulador de orçamento por tipo, área e padrão, portfólio de obras com filtro, etapas da obra interativas e pedido de visita técnica.',
    accent: '#FBBF24',
    year: '2026',
    scope: ['Simulador de orçamento', 'Portfólio de obras', 'Etapas da obra', 'Visita técnica'],
    metrics: [
      { label: 'Orçamento', value: 'em tempo real' },
      { label: 'Obras', value: 'com filtro' },
      { label: 'Etapas', value: 'da obra' },
    ],
  },
];

export const demoBySlug = Object.fromEntries(demos.map((d) => [d.slug, d])) as Record<
  DemoSlug,
  Demo
>;
