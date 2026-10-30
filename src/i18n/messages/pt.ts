import type { DemoNiche, ShowcaseSlug } from '@/lib/estudio';


export const pt = {
  meta: {
    title: 'MX Studio Web · Sites que trazem clientes',
    description:
      'Estúdio de sites sob medida no Rio de Janeiro: sites rápidos que viram conversa no WhatsApp, para clínicas, escritórios e negócios do Brasil e do exterior.',
  },

  nav: {
    work: 'Trabalhos',
    process: 'Processo',
    pricing: 'Preços',
    about: 'Sobre',
    contact: 'Contato',
    cta: 'Consulte sites para pequenas empresas',
    home: 'MX Studio Web, página inicial',
    menuLabel: 'Navegação principal',
    menu: 'Abrir menu',
    close: 'Fechar menu',
    language: 'Idioma',
    skip: 'Pular para o conteúdo',
  },

  whatsappMsg: 'Olá! Vim pelo site da MX Studio Web e quero conversar sobre um site.',

  hero: {
    eyebrow: 'Estúdio de sites · Rio de Janeiro',
    titleA: 'Sites que trazem',
    titleAccent: 'clientes',
    titleB: 'para o seu negócio.',
    lead: 'Sites sob medida para clínicas, escritórios, lojas e negócios locais: rápidos no celular e feitos para virar conversa no WhatsApp. Você fala direto com quem desenha e programa.',
    primary: 'Consulte sites para pequenas empresas',
    note: 'Três planos com criação + mensalidade, site no ar em 14 dias, nesta página.',
    secondary: 'Falar no WhatsApp',
    caseLabel: 'Cliente real · sulamitaestetica.pt',
    desktopAlt: 'Página inicial do site da Sulamita Nascimento no computador',
    mobileAlt: 'Site da Sulamita Nascimento no celular',
  },

  case: {
    label: 'Cliente real',
    name: 'Sulamita Nascimento',
    business: 'Estética de Resultados',
    text: 'Site bilíngue para uma especialista em estética em Caldas da Rainha, Portugal. Apresenta os tratamentos, passa confiança e leva a cliente direto para marcar a consulta.',
    facts: [
      { label: 'Domínio', value: 'sulamitaestetica.pt' },
      { label: 'Idiomas', value: 'Português e inglês' },
      { label: 'No ar desde', value: 'Setembro de 2026' },
    ],
    visit: 'Ver o site no ar',
    imageAlt: 'Página inicial do site da Sulamita Nascimento, rolando até os tratamentos',
  },

  work: {
    label: 'Modelos',
    title: 'Modelos de site por ramo, funcionando de verdade.',
    lead: 'Cada modelo é um site completo, criado pela MX Studio Web para um negócio fictício. Abra, clique, faça uma reserva ou monte um carrinho: é assim que o seu vai funcionar.',
    badge: 'Modelo de demonstração',
    open: 'Abrir',
    lcp: 'Carrega em {value} no 4G',
    note: 'Tempo de carregamento medido com o Google Lighthouse (o mesmo motor do PageSpeed Insights), sem cache, em 4G simulado com processador 4× mais lento: o pior de 3 medições.',
    cta: 'Quero um site assim',
    imageAlt: 'Página inicial do modelo {name}',
    niches: {
      saude: 'Saúde',
      beleza: 'Beleza e estética',
      advocacia: 'Advocacia',
      lojas: 'Loja virtual',
      restaurantes: 'Restaurante',
      imobiliarias: 'Imobiliária',
      construcao: 'Construção',
      cursos: 'Curso online',
    } as Record<DemoNiche, string>,
    cards: {
      'clinica-sereno': 'Clínica multiprofissional com agenda online',
      'motta-advogados': 'Escritório de advocacia com triagem de casos',
      'moda-arte': 'Loja de moda com carrinho e checkout',
      'restaurante-terra': 'Restaurante com cardápio e reservas',
      'costa-imoveis': 'Imobiliária com busca de imóveis em tempo real',
      'rota-clara': 'Página de vendas de curso online',
    } as Record<ShowcaseSlug, string>,
  },

  process: {
    label: 'Como funciona',
    title: 'Do primeiro contato ao site no ar, sem surpresa.',
    lead: 'Primeiro, uma prévia gratuita do seu site, feita a partir das suas redes e do seu site atual. Aprovou a prévia e pagou a primeira etapa? As quatro etapas abaixo cabem em 14 dias.',
    steps: [
      {
        title: 'Descoberta',
        duration: '1 a 2 dias',
        text: 'A partir da prévia aprovada, alinhamos público, textos e estrutura. Você, ou alguém que você indicar, fica disponível para os ajustes e responde em até 2 dias úteis.',
      },
      {
        title: 'Design',
        duration: '3 a 4 dias',
        text: 'Direção visual e telas internas do site. Você aprova tudo antes de qualquer linha de código. No Growth, essa aprovação marca a segunda etapa de pagamento.',
      },
      {
        title: 'Desenvolvimento',
        duration: '5 a 7 dias',
        text: 'Programação do site, com um link de prévia para você acompanhar desde o primeiro dia.',
      },
      {
        title: 'Lançamento',
        duration: '1 dia',
        text: 'Com o pagamento final confirmado, o site vai ao ar no seu domínio, com SEO técnico, medição de visitas e um guia de uso. A mensalidade começa aqui.',
      },
    ],
  },

  pricing: {
    schedule: {
      label: 'Pagamento em etapas',
      title: 'Como o valor da criação é pago.',
      lead: 'Você só paga a primeira etapa depois de ver e aprovar a prévia gratuita do seu site. O restante acompanha as entregas dos 14 dias, e a mensalidade só começa quando o site vai ao ar.',
      planCol: 'Plano',
      setupCol: 'Criação',
      monthlyCol: 'Mensalidade',
      monthlyWhen: 'Na publicação',
      per: '/mês',
      day: 'Dia {day}',
      noStage: 'Sem pagamento nesta etapa',
      stages: { approval: 'Aprovação da prévia', layout: 'Layout interno aprovado', delivery: 'Entrega do site' },
      notes: [
        'Antes do dia 0: monto uma prévia gratuita a partir do seu Instagram, Facebook, Google Business, TikTok ou site atual. Sem compromisso.',
        'Os 14 dias começam quando você aprova a prévia e o pagamento da primeira etapa é confirmado.',
        'Os percentuais são os mesmos no cartão, Pix, boleto ou Wise. No boleto e na Wise, a cobrança chega alguns dias antes de cada etapa.',
        'O site vai ao ar depois que o pagamento final é confirmado. Prazo pausado enquanto esperamos sua resposta ou um pagamento.',
      ],
      termsBefore: 'Regras completas no item 4 dos ',
      termsLink: 'Termos de Serviço',
      termsAfter: '.',
      termsAnchor: 'pagamento',
    },
    payments: {
      title: 'Formas de pagamento',
      methods: ['Cartão de crédito, Apple Pay e Google Pay', 'Pix', 'Boleto bancário', 'Wise, combinado direto comigo'],
      note: 'No site, tudo passa pelo Stripe. O botão de cada plano paga a primeira etapa da criação (50% no Launch e no Business, 40% no Growth) no cartão, Pix ou boleto, e o prazo de 14 dias começa aí. As etapas seguintes chegam por fatura do Stripe no seu e-mail, também por cartão, Pix ou boleto. A mensalidade só começa quando o site for publicado. Fora do Brasil, o checkout mostra o valor na sua moeda. Prefere pagar pela Wise? Combine direto comigo pelo WhatsApp ou e-mail, fora do checkout.',
    },
    plans: {
      label: 'Planos para pequenos negócios',
      title: 'Seu site no ar em 14 dias, a partir de {price}.',
      lead: 'Valor fechado: um pagamento de criação e uma mensalidade de manutenção. Escolha a moeda para ver os valores.',
      currencyLabel: 'Moeda',
      approx: 'Valores convertidos pela cotação do dia da publicação; o preço de referência é em euro.',
      setupLabel: 'Criação',
      monthlyLabel: 'Manutenção',
      per: '/mês',
      plus: '+',
      featured: 'Mais escolhido',
      delivery: 'No ar em {days} dias',
      cta: 'Quero o plano {plan}',
      checkout: 'Contratar o {plan}: pagar entrada',
      whatsapp: 'Tirar dúvidas no WhatsApp',
      secure: 'Pagamento seguro pelo Stripe, no cartão, Pix ou boleto: hoje você paga só a primeira etapa da criação; o restante vem por fatura e a mensalidade começa na publicação. Fora do Brasil, o checkout mostra o valor na sua moeda.',
      email: 'Prefere e-mail?',
      emailSubject: 'Plano {plan} — MX Studio Web',
      askMsg: 'Olá! Vim pelo site da MX Studio Web e quero o plano {plan}: {setup} de criação + {monthly}/mês de manutenção, site no ar em 14 dias.',
      maintenance: 'A manutenção mensal cobre hospedagem, atualizações, segurança, backups e pequenas alterações de texto e imagem.',
      termsNotice: { before: 'Ao contratar, você aceita os ', link: 'Termos de Serviço', after: ' (licença de uso, renovação automática, atraso e cancelamento).' },
      plans: {
        launch: {
          name: 'Launch',
          text: 'Uma página para apresentar o negócio e receber contatos.',
          bullets: ['Página única com até 3 seções', 'Design responsivo', 'Formulário + WhatsApp', 'SEO básico', '1 rodada de ajustes'],
        },
        business: {
          name: 'Business',
          text: 'O site completo de um pequeno negócio.',
          bullets: ['Até 5 páginas', 'Design sob medida para a marca', 'SEO on-page + Google Analytics', 'Formulário + WhatsApp', '3 rodadas de ajustes'],
        },
        growth: {
          name: 'Growth',
          text: 'Para quem quer gerar contatos todo mês.',
          bullets: ['Até 10 páginas', 'Blog ou portfólio editável', 'Agendamento ou captura de contatos', 'SEO avançado + velocidade', 'Suporte prioritário'],
        },
      },
    },
  },

  about: {
    label: 'Sobre',
    title: 'Quem faz o seu site.',
    p1: 'Sou Max Costa, fundador da MX Studio Web. Cuido pessoalmente de cada projeto, da primeira conversa ao site no ar: você fala direto com quem desenha e programa.',
    p2: 'Também tenho uma consultoria de dados e BI. Por isso trato o site como ferramenta de negócio: ele existe para trazer contatos, e isso dá para medir.',
    points: [
      'Atendimento direto, sem intermediário',
      'Contrato com escopo e prazo',
      'Domínio e código no seu nome',
      'Rio de Janeiro, atendendo Brasil e exterior',
    ],
    photoAlt: 'Max Costa, fundador da MX Studio Web',
    role: 'Fundador da MX Studio Web',
  },

  faq: {
    label: 'Perguntas frequentes',
    title: 'O que costumam perguntar.',
    items: [
      {
        q: 'Como funciona a prévia grátis?',
        a: 'Você entra em contato e eu monto uma prévia do site usando o que o seu negócio já tem: Instagram, Facebook, Google Business, TikTok, site antigo. Apresento a prévia sem compromisso. Se aprovar, o prazo de 14 dias começa com o pagamento da primeira etapa.',
      },
      {
        q: 'Em quanto tempo o site fica pronto?',
        a: 'Nos planos Launch, Business e Growth, o site fica no ar em 14 dias. Projetos sob medida têm prazo próprio, com as datas de cada etapa na proposta.',
      },
      {
        q: 'Como é o pagamento?',
        a: 'Os planos Launch, Business e Growth têm um valor de criação e uma mensalidade de manutenção. A criação é paga em etapas pelo Stripe, no cartão de crédito, Apple Pay, Google Pay, Pix ou boleto: 50% na aprovação da prévia e 50% na entrega no Launch e no Business; 40%, 30% (dia 7) e 30% (entrega) no Growth. A primeira etapa é paga pelo botão do plano e as demais chegam por fatura no seu e-mail. A mensalidade só começa quando o site for publicado. Se preferir pagar pela Wise, é só combinar direto comigo pelo WhatsApp ou e-mail. Projetos sob medida têm contrato e pagamento em 3 etapas: 40% no início, 30% na aprovação do design e 30% na entrega.',
      },
      {
        q: 'Você usa modelo pronto?',
        a: 'Não. Cada site é desenhado e programado para o seu negócio. No fim, o domínio e o código ficam no seu nome, sem fidelidade.',
      },
      {
        q: 'E depois que o site estiver no ar?',
        a: 'Você recebe um guia de uso e 30 dias de garantia para correções. Depois, a manutenção mensal do plano cobre hospedagem, atualizações, segurança, backups e pequenas alterações de texto e imagem.',
      },
      {
        q: 'Atende fora do Rio de Janeiro?',
        a: 'Sim. Atendo todo o Brasil, Portugal e outros países, por videochamada e WhatsApp. Clientes de fora do Brasil pagam pelo Stripe, com cartão, na própria moeda, ou pela Wise, combinando direto comigo.',
      },
    ],
  },

  contact: {
    label: 'Contato',
    title: 'Vamos conversar sobre o seu site?',
    lead: 'Conte rapidamente sobre o seu negócio. Respondo em até 24 horas em dias úteis.',
    channels: {
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      instagram: 'Instagram',
      preview: 'Prévia grátis',
      previewText: 'Diagnóstico de 5 minutos',
    },
    form: {
      name: 'Nome',
      namePlaceholder: 'Como prefere ser chamado?',
      email: 'E-mail',
      emailPlaceholder: 'voce@empresa.com',
      project: 'Tipo de projeto',
      projects: ['Plano Launch', 'Plano Business', 'Plano Growth', 'Outro / ainda não sei'],
      message: 'Sobre o projeto',
      messagePlaceholder: 'O que a empresa faz, o que precisa e para quando.',
      footnote: 'Ao enviar, o WhatsApp abre com a sua mensagem pronta.',
      send: 'Enviar pelo WhatsApp',
      waIntro: 'Olá! Vim pelo site da MX Studio Web.',
      waProject: 'Projeto',
      errorName: 'Escreva seu nome.',
      errorEmail: 'Confira o e-mail.',
      errorMessage: 'Conte um pouco mais sobre o projeto.',
      sentTitle: 'Quase lá',
      sentText: 'Abri o WhatsApp com a sua mensagem, {name}. É só tocar em enviar por lá.',
      sentRetry: 'O WhatsApp não abriu? Toque aqui.',
    },
  },

  footer: {
    blurb: 'Sites sob medida que trazem clientes. Rio de Janeiro, atendendo Brasil e exterior.',
    navTitle: 'Navegação',
    contactTitle: 'Contato',
    languagesTitle: 'Idiomas',
    rights: 'Todos os direitos reservados.',
    terms: 'Termos de Serviço',
    location: 'Rio de Janeiro, Brasil',
  },

  demo: {
    badge: 'Modelo de demonstração',
    description:
      '{name} é um modelo de site criado pela MX Studio Web para um negócio fictício. Abra e teste: tudo funciona.',
  },
};

export type Messages = typeof pt;
