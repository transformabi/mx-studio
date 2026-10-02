import type { DemoNiche, DemoSlug } from '@/lib/estudio';

type DemoCardText = {
  vertical: string;
  tagline: string;
  metrics: { label: string; value: string }[];
};

export const pt = {
  meta: {
    title: 'MX Studio Web · Sites que trazem clientes',
    description:
      'Sites sob medida que trazem clientes para clínicas, escritórios e lojas, do Rio de Janeiro a Portugal. Teste 9 demos funcionais e peça uma prévia grátis do seu.',
    keywords: [
      'site para clínica',
      'site para advogado',
      'site para loja',
      'sites sob medida',
      'Rio de Janeiro',
      'Portugal',
      'MX Studio Web',
    ],
    ogDescription:
      'Sites que trazem clientes para clínicas, escritórios e lojas. 9 demos funcionais pra testar.',
  },

  nav: {
    home: 'Início',
    work: 'Trabalhos',
    process: 'Processo',
    about: 'Sobre',
    studio: 'Estúdio',
    homeAria: 'MX Studio Web · Início',
    mainNav: 'Principal',
    mobileNav: 'Móvel',
    backShort: '← Portfólio',
    backLong: '← Voltar ao portfólio',
    startProject: 'Pedir prévia grátis',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },

  prefs: {
    label: 'Idioma e moeda',
    language: 'Idioma',
    currency: 'Moeda',
    currencies: {
      BRL: 'Real brasileiro',
      USD: 'Dólar americano',
      EUR: 'Euro',
      GBP: 'Libra esterlina',
      BTC: 'Bitcoin',
    },
    ratesNote: 'Preços em outras moedas são convertidos do real pela cotação do dia.',
  },

  whatsappMsg: 'Olá! Vim pelo site da MX Studio Web e queria conversar sobre um projeto.',

  hero: {
    badge: 'Disponível pra 2 projetos em outubro',
    titleA: 'Sites que trazem',
    titleAccent: 'clientes',
    titleB: 'para clínicas, escritórios e lojas',
    lead:
      'A MX Studio Web faz sites sob medida para negócios do Rio de Janeiro e de Portugal: rápidos no celular e pensados pra virar conversa no WhatsApp. Do brief ao pós-lançamento, um humano só. Sem template, sem intermediário.',
    preview: 'Pedir prévia grátis',
    previewNote: 'Diagnóstico de 5 min · a prévia chega no WhatsApp',
    seeWork: 'Ver as 9 demos',
    stats: [
      { kpi: '9', label: 'demos pra você testar' },
      { kpi: '100%', label: 'código no seu GitHub' },
      { kpi: '3–7', label: 'semanas por projeto' },
      { kpi: '24h', label: 'pra responder' },
    ],
  },

  marquee: [
    'E-commerce',
    'Restaurantes',
    'Clínicas',
    'Odontologia',
    'Estética',
    'Advocacia',
    'Imobiliárias',
    'Construtoras',
    'Infoprodutos',
  ],

  work: {
    eyebrow: 'Trabalhos',
    titleA: 'Cada card abre uma',
    titleEm: 'demo funcional',
    titleB: ' do site.',
    lead: 'Clique, teste os botões, adicione ao carrinho, faça uma reserva. Se funciona aqui, funciona no seu.',
    note: 'LCP e peso medidos em produção, sem cache, em 4G com CPU 4× mais lenta — pior caso de 3 medições. Não precisa acreditar: jogue a URL de qualquer demo no PageSpeed Insights do Google e confira.',
    count: '{niches} nichos · {models} modelos de site',
    openDemo: 'Abrir demo {name}',
    number: 'Nº',
    all: 'Todos',
    modelOne: '1 modelo',
    modelMany: '{n} modelos',
    niches: {
      saude: { label: 'Saúde', blurb: 'Clínicas, consultórios e odontologia' },
      beleza: { label: 'Beleza & estética', blurb: 'Clínicas de estética, salões e barbearias' },
      advocacia: { label: 'Advocacia', blurb: 'Escritórios de advocacia' },
      lojas: { label: 'Lojas', blurb: 'Lojas virtuais e comércio' },
      restaurantes: { label: 'Restaurantes', blurb: 'Restaurantes, bares e delivery' },
      imobiliarias: { label: 'Imobiliárias', blurb: 'Corretores e imobiliárias' },
      construcao: { label: 'Construção', blurb: 'Construtoras e reformas' },
      cursos: { label: 'Cursos', blurb: 'Cursos online, escolas e infoprodutos' },
    } as Record<DemoNiche, { label: string; blurb: string }>,
    fillerEyebrow: 'Prévia grátis',
    fillerTitle: 'Quer um site assim pro seu negócio?',
    fillerText: 'Responda o diagnóstico de 5 min e receba uma prévia do seu site, no seu ramo, pelo WhatsApp.',
    fillerCta: 'Pedir prévia grátis',
    cards: {
      'moda-arte': {
        vertical: 'E-commerce',
        tagline: 'Loja de moda autoral',
        metrics: [
          { label: '1.8s', value: 'LCP no 4G' },
          { label: '741 KB', value: 'a página inteira' },
          { label: 'PIX', value: 'no checkout' },
        ],
      },
      'restaurante-terra': {
        vertical: 'Gastronomia',
        tagline: 'Restaurante de alta gastronomia',
        metrics: [
          { label: '1.7s', value: 'LCP no 4G' },
          { label: '397 KB', value: 'a página inteira' },
          { label: '24/7', value: 'reserva sem ligação' },
        ],
      },
      'clinica-sereno': {
        vertical: 'Saúde',
        tagline: 'Clínica multiprofissional',
        metrics: [
          { label: '1.8s', value: 'LCP no 4G' },
          { label: '465 KB', value: 'a página inteira' },
          { label: '0', value: 'de layout shift' },
        ],
      },
      'motta-advogados': {
        vertical: 'Advocacia',
        tagline: 'Escritório de advocacia',
        metrics: [
          { label: '1.2s', value: 'LCP no 4G' },
          { label: '489 KB', value: 'a página inteira' },
          { label: 'OAB', value: 'Prov. 205/2021' },
        ],
      },
      'costa-imoveis': {
        vertical: 'Imobiliária',
        tagline: 'Vitrine imobiliária boutique',
        metrics: [
          { label: '1.7s', value: 'LCP no 4G' },
          { label: '679 KB', value: 'a página inteira' },
          { label: 'Filtro', value: 'em tempo real' },
        ],
      },
      'rota-clara': {
        vertical: 'Infoproduto',
        tagline: 'Curso online + landing de vendas',
        metrics: [
          { label: '1.8s', value: 'LCP no 4G' },
          { label: '735 KB', value: 'a página inteira' },
          { label: 'Checkout', value: 'em 3 etapas' },
        ],
      },
      'lumi-odonto': {
        vertical: 'Odontologia',
        tagline: 'Clínica odontológica estética',
        metrics: [
          { label: 'Simulador', value: 'de clareamento' },
          { label: 'Agenda', value: 'em 3 passos' },
          { label: 'CRO', value: 'responsável técnico' },
        ],
      },
      'iris-estetica': {
        vertical: 'Estética',
        tagline: 'Clínica de estética avançada',
        metrics: [
          { label: 'Quiz', value: 'de avaliação' },
          { label: 'Pacotes', value: 'preço em tempo real' },
          { label: 'Filtro', value: 'por área do corpo' },
        ],
      },
      'alicerce-construtora': {
        vertical: 'Construtora',
        tagline: 'Construtora e reformas',
        metrics: [
          { label: 'Orçamento', value: 'em tempo real' },
          { label: 'Obras', value: 'com filtro' },
          { label: 'Etapas', value: 'da obra' },
        ],
      },
    } as Record<DemoSlug, DemoCardText>,
  },

  process: {
    eyebrow: 'Processo',
    titleA: 'Um jeito',
    titleEm: 'sem surpresa',
    titleB: ' de fazer o seu site.',
    steps: [
      {
        title: 'Discovery',
        duration: '3–5 dias',
        text: 'Sessão de imersão. Entendo o negócio, o público e o que já funciona. Saio com um brief e uma proposta de arquitetura.',
      },
      {
        title: 'Design',
        duration: '1–2 semanas',
        text: 'Wireframes rápidos, direção de arte e telas de alta fidelidade. Você aprova antes de qualquer código.',
      },
      {
        title: 'Desenvolvimento',
        duration: '2–4 semanas',
        text: 'Implementação em Next.js + Tailwind ou PHP, conforme o projeto. Você acompanha em ambiente de staging desde o dia 1.',
      },
      {
        title: 'Lançamento',
        duration: '2–3 dias',
        text: 'Deploy em domínio próprio, analytics + SEO técnico, passagem de bastão com documentação.',
      },
    ],
  },

  services: {
    eyebrow: 'Serviços',
    titleA: 'O que costumo fazer,',
    titleEm: 'com prazo e preço claros',
    titleB: '.',
    from: 'a partir de',
    items: [
      { title: 'Site institucional', bullets: ['4–8 páginas', 'CMS opcional', 'Design system próprio', 'SEO técnico'] },
      { title: 'E-commerce', bullets: ['Catálogo + carrinho', 'Checkout PIX + cartão', 'Área do cliente', 'Painel do lojista'] },
      { title: 'Landing de conversão', bullets: ['Copywriting-first', 'A/B ready', 'Analytics + pixels', 'Deploy em 10 dias'] },
      { title: 'Sistema web sob medida', bullets: ['Login + auth', 'Painel + roles', 'Integrações', 'Escopo customizado'] },
    ],
  },

  about: {
    eyebrow: 'Sobre',
    titleA: 'Um',
    titleEm: 'humano só',
    titleB: ' do brief à entrega.',
    p1: 'A MX Studio Web nasceu no Rio de Janeiro, entre agências, produto e consultoria, até virar um estúdio independente. O que aprendi: cliente não quer site — quer que o site resolva.',
    p2: 'Atendo do Rio e de Portugal e pego poucos projetos por vez, porque cuidar de perto é o que separa um site que só existe de um site que traz cliente.',
    talk: 'Vamos conversar',
    seeWork: 'Ver os trabalhos',
    stack: 'Stack',
    alsoWith: 'Também trabalho com',
    howIWork: 'Como trabalho',
    howItems: [
      'Contrato + escopo',
      'Pagamento parcelado',
      'Staging desde o dia 1',
      'Código no seu GitHub',
      '30 dias de garantia',
      'Sem lock-in',
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    titleA: 'O que as pessoas',
    titleEm: 'costumam perguntar',
    titleB: '.',
    items: [
      {
        q: 'Por que {price} e não {cheap} como muito freelancer cobra?',
        a: 'Porque não é o mesmo produto. {cheap} geralmente é template do Elementor sem estratégia, que trava no celular e você não consegue editar depois. Aqui é código próprio em Next.js, design pensado pro seu negócio, integrações reais, performance verde no Core Web Vitals e o código no seu GitHub no fim.',
      },
      {
        q: 'Em quanto tempo o site fica pronto?',
        a: 'De 3 a 7 semanas dependendo do escopo. O cronograma vai fechado na proposta, com marcos e datas.',
      },
      {
        q: 'Você trabalha com contrato e pagamento parcelado?',
        a: 'Sim. Contrato de prestação de serviço com escopo e prazo. Pagamento em 3 parcelas: 40% no início, 30% na aprovação do design, 30% na entrega. PIX, boleto ou transferência.',
      },
      {
        q: 'Depois de entregue, como fica a manutenção?',
        a: 'Você recebe o site pronto na Vercel, com documentação. Se quiser, contrata cuidado contínuo mensal com evoluções priorizadas e suporte prioritário.',
      },
      {
        q: 'Você usa template pronto?',
        a: 'Não. Código do zero, em Next.js + Tailwind ou PHP, conforme o projeto. Nada de Elementor ou tema WordPress. O código é seu — sem lock-in.',
      },
      {
        q: 'Atende fora do Rio de Janeiro?',
        a: 'Sim: todo o Brasil, Portugal e outros países. Reuniões em Meet, WhatsApp pro dia a dia e ambiente de staging pra acompanhar em tempo real.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contato',
    titleA: 'Bora tirar o seu site',
    titleEm: 'do papel',
    titleB: '?',
    lead: 'Me manda um resumo do projeto. Se fizer sentido, marco uma call de 30 min pra entender melhor e devolver uma proposta em até 3 dias.',
    preview: 'Prévia grátis',
    previewText: 'Diagnóstico de 5 min, prévia no WhatsApp',
    whatsapp: 'WhatsApp',
    email: 'E-mail',
  },

  form: {
    name: 'Nome',
    namePlaceholder: 'Como quer ser chamado?',
    email: 'E-mail',
    emailPlaceholder: 'voce@dominio.com',
    project: 'Qual tipo de projeto?',
    projects: ['Site institucional', 'E-commerce', 'Landing de conversão', 'Sistema sob medida', 'Ainda não sei'],
    budget: 'Faixa de investimento',
    budgetUpTo: 'Até {amount}',
    budgetAbove: 'Acima de {amount}',
    message: 'Sobre o projeto',
    messagePlaceholder: 'Conta brevemente: o que a empresa faz, o que precisa e um prazo desejado.',
    footnote: 'Ao enviar, o WhatsApp abre com a sua mensagem pronta · resposta em até 24h.',
    send: 'Enviar pelo WhatsApp',
    waIntro: 'Olá! Vim pelo site da MX Studio Web.',
    waProject: 'Projeto',
    waBudget: 'Investimento',
    errorName: 'Diz seu nome, por favor.',
    errorEmail: 'E-mail inválido.',
    errorMessage: 'Conta um pouquinho mais sobre o projeto.',
    sentTitle: 'Quase lá!',
    sentText:
      'Abri o WhatsApp com a sua mensagem, {name}. É só tocar em enviar por lá — respondo em até 24 horas.',
    sentRetry: 'O WhatsApp não abriu? Toque aqui.',
  },

  footer: {
    tagline: 'Estúdio digital',
    description:
      'Sites sob medida que trazem clientes para clínicas, escritórios e lojas. Do brief à entrega, um humano só.',
    location: 'Rio de Janeiro · Portugal · atende Brasil e exterior',
    portfolio: 'Portfólio',
    work: 'Trabalhos',
    process: 'Processo',
    services: 'Serviços',
    about: 'Sobre',
    demos: 'Demos',
    demoLinks: {
      'moda-arte': 'E-commerce',
      'restaurante-terra': 'Restaurante',
      'clinica-sereno': 'Clínica',
      'motta-advogados': 'Advocacia',
      'costa-imoveis': 'Imobiliária',
      'rota-clara': 'Infoproduto',
      'lumi-odonto': 'Odontologia',
      'iris-estetica': 'Estética',
      'alicerce-construtora': 'Construtora',
    } as Record<DemoSlug, string>,
    ctaEyebrow: 'Vamos conversar?',
    ctaTitle: 'Respondo em até 24 horas.',
    sendEmail: 'Enviar e-mail',
    rights: 'Estúdio digital · Todos os direitos reservados',
    madeWith: 'Feito à mão em Next.js',
  },
};

export type Messages = typeof pt;
