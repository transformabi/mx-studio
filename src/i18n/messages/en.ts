import type { Messages } from './pt';

export const en: Messages = {
  meta: {
    title: 'MX Studio Web · Websites that bring in clients',
    description:
      'Custom websites that bring in clients for clinics, law firms and shops, from Rio de Janeiro to Portugal. Try 10 working demos and ask for a free preview of yours.',
    keywords: [
      'clinic website',
      'law firm website',
      'shop website',
      'custom websites',
      'Rio de Janeiro',
      'Portugal',
      'MX Studio Web',
    ],
    ogDescription:
      'Websites that bring in clients for clinics, law firms and shops. 10 working demos to try.',
  },

  nav: {
    home: 'Home',
    work: 'Work',
    process: 'Process',
    about: 'About',
    studio: 'Studio',
    homeAria: 'MX Studio Web · Home',
    mainNav: 'Main',
    mobileNav: 'Mobile',
    backShort: '← Portfolio',
    backLong: '← Back to portfolio',
    startProject: 'Get a free preview',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  prefs: {
    label: 'Language and currency',
    language: 'Language',
    currency: 'Currency',
    currencies: {
      BRL: 'Brazilian real',
      USD: 'US dollar',
      EUR: 'Euro',
      GBP: 'British pound',
      BTC: 'Bitcoin',
    },
    ratesNote: "Prices in other currencies are converted from BRL at today's exchange rate.",
  },

  whatsappMsg: "Hi! I found MX Studio Web's website and would like to talk about a project.",

  hero: {
    badge: 'Available for 2 projects in October',
    titleA: 'Websites that bring in',
    titleAccent: 'clients',
    titleB: 'for clinics, law firms and shops',
    lead:
      'MX Studio Web builds custom websites for businesses in Rio de Janeiro and Portugal: fast on mobile and designed to turn visits into WhatsApp conversations. One person from brief to post-launch. No templates, no middlemen.',
    preview: 'Get a free preview',
    previewNote: '5-min questionnaire · preview sent on WhatsApp',
    seeWork: 'See the 10 demos',
    stats: [
      { kpi: '10', label: 'demos for you to try' },
      { kpi: '100%', label: 'code in your GitHub' },
      { kpi: '3–7', label: 'weeks per project' },
      { kpi: '24h', label: 'to reply' },
    ],
  },

  marquee: [
    'E-commerce',
    'Restaurants',
    'Clinics',
    'Dental clinics',
    'Aesthetics',
    'Law firms',
    'Real estate',
    'Builders',
    'Online courses',
  ],

  work: {
    eyebrow: 'Work',
    titleA: 'Every card opens a',
    titleEm: 'working demo',
    titleB: ' of the site.',
    lead: 'Click around, test the buttons, add to cart, book a table. If it works here, it works on yours.',
    note: "LCP and page weight measured in production, uncached, on 4G with a 4× slower CPU — worst of 3 runs. Don't take our word for it: drop any demo URL into Google PageSpeed Insights and check.",
    count: '{niches} niches · {models} site models',
    openDemo: 'Open {name} demo',
    number: 'No.',
    all: 'All',
    clientOne: '1 real client',
    clientMany: '{n} real clients',
    modelOne: '1 model',
    modelMany: '{n} models',
    clientBadge: 'Real client',
    visitSite: "Visit {name}'s site",
    clients: {
      'sulamita-estetica': {
        vertical: 'Aesthetics',
        tagline: 'Skin management in Caldas da Rainha, Portugal',
        metrics: [
          { label: '.pt', value: 'own domain' },
          { label: 'PT · EN', value: 'bilingual site' },
          { label: 'Live', value: 'since Sep 2026' },
        ],
      },
    },
    niches: {
      saude: { label: 'Health', blurb: 'Clinics, practices and dentistry' },
      beleza: { label: 'Beauty & aesthetics', blurb: 'Aesthetic clinics, salons and barbershops' },
      advocacia: { label: 'Law', blurb: 'Law firms' },
      lojas: { label: 'Shops', blurb: 'Online stores and retail' },
      restaurantes: { label: 'Restaurants', blurb: 'Restaurants, bars and delivery' },
      imobiliarias: { label: 'Real estate', blurb: 'Agents and agencies' },
      construcao: { label: 'Construction', blurb: 'Builders and renovations' },
      cursos: { label: 'Courses', blurb: 'Online courses, schools and info products' },
    },
    fillerEyebrow: 'Free preview',
    fillerTitle: 'Want a site like this for your business?',
    fillerText: 'Answer the 5-min questionnaire and get a preview of your site, in your field, on WhatsApp.',
    fillerCta: 'Get a free preview',
    cards: {
      'moda-arte': {
        vertical: 'E-commerce',
        tagline: 'Independent fashion store',
        metrics: [
          { label: '1.8s', value: 'LCP on 4G' },
          { label: '741 KB', value: 'whole page' },
          { label: 'PIX', value: 'at checkout' },
        ],
      },
      'restaurante-terra': {
        vertical: 'Food & dining',
        tagline: 'Fine dining restaurant',
        metrics: [
          { label: '1.7s', value: 'LCP on 4G' },
          { label: '397 KB', value: 'whole page' },
          { label: '24/7', value: 'bookings, no calls' },
        ],
      },
      'clinica-sereno': {
        vertical: 'Healthcare',
        tagline: 'Multidisciplinary clinic',
        metrics: [
          { label: '1.8s', value: 'LCP on 4G' },
          { label: '465 KB', value: 'whole page' },
          { label: '0', value: 'layout shift' },
        ],
      },
      'motta-advogados': {
        vertical: 'Legal',
        tagline: 'Law firm',
        metrics: [
          { label: '1.2s', value: 'LCP on 4G' },
          { label: '489 KB', value: 'whole page' },
          { label: 'OAB', value: 'Prov. 205/2021' },
        ],
      },
      'costa-imoveis': {
        vertical: 'Real estate',
        tagline: 'Boutique property showcase',
        metrics: [
          { label: '1.7s', value: 'LCP on 4G' },
          { label: '679 KB', value: 'whole page' },
          { label: 'Filters', value: 'in real time' },
        ],
      },
      'rota-clara': {
        vertical: 'Online course',
        tagline: 'Online course + sales page',
        metrics: [
          { label: '1.8s', value: 'LCP on 4G' },
          { label: '735 KB', value: 'whole page' },
          { label: 'Checkout', value: 'in 3 steps' },
        ],
      },
      'lumi-odonto': {
        vertical: 'Dentistry',
        tagline: 'Cosmetic dental clinic',
        metrics: [
          { label: 'Simulator', value: 'teeth whitening' },
          { label: 'Booking', value: 'in 3 steps' },
          { label: 'CRO', value: 'licensed lead dentist' },
        ],
      },
      'iris-estetica': {
        vertical: 'Aesthetics',
        tagline: 'Advanced aesthetics clinic',
        metrics: [
          { label: 'Quiz', value: 'online assessment' },
          { label: 'Packages', value: 'live pricing' },
          { label: 'Filter', value: 'by body area' },
        ],
      },
      'alicerce-construtora': {
        vertical: 'Construction',
        tagline: 'Builder & renovations',
        metrics: [
          { label: 'Estimate', value: 'in real time' },
          { label: 'Projects', value: 'with filters' },
          { label: 'Stages', value: 'of the build' },
        ],
      },
      'mare-salao': {
        vertical: 'Beauty salon',
        tagline: 'Salon with online booking',
        metrics: [
          { label: 'Booking', value: 'in 4 steps' },
          { label: 'Total', value: 'adds up live' },
          { label: 'Team', value: 'by specialty' },
        ],
      },
    },
  },

  process: {
    eyebrow: 'Process',
    titleA: 'A',
    titleEm: 'no-surprises',
    titleB: ' way to build your site.',
    steps: [
      {
        title: 'Discovery',
        duration: '3–5 days',
        text: "An immersion session. I get to know the business, the audience and what's already working. I come out with a brief and a proposed architecture.",
      },
      {
        title: 'Design',
        duration: '1–2 weeks',
        text: 'Quick wireframes, art direction and high-fidelity screens. You approve everything before any code is written.',
      },
      {
        title: 'Development',
        duration: '2–4 weeks',
        text: 'Built with Next.js + Tailwind or PHP, depending on the project. You follow along in a staging environment from day 1.',
      },
      {
        title: 'Launch',
        duration: '2–3 days',
        text: 'Deploy to your own domain, analytics + technical SEO, and a handover with documentation.',
      },
    ],
  },

  services: {
    eyebrow: 'Services',
    titleA: 'What I usually build,',
    titleEm: 'with clear timelines and prices',
    titleB: '.',
    from: 'starting at',
    items: [
      { title: 'Business website', bullets: ['4–8 pages', 'Optional CMS', 'Custom design system', 'Technical SEO'] },
      { title: 'E-commerce', bullets: ['Catalog + cart', 'PIX + card checkout', 'Customer account', 'Store admin panel'] },
      { title: 'Conversion landing page', bullets: ['Copywriting-first', 'A/B ready', 'Analytics + pixels', 'Live in 10 days'] },
      { title: 'Custom web app', bullets: ['Login + auth', 'Dashboard + roles', 'Integrations', 'Tailored scope'] },
    ],
  },

  about: {
    eyebrow: 'About',
    titleA: 'A',
    titleEm: 'single human',
    titleB: ' from brief to delivery.',
    p1: "MX Studio Web was born in Rio de Janeiro, shaped by years in agencies, product teams and consulting before becoming an independent studio. What I learned: clients don't want a website — they want the website to solve something.",
    p2: 'I work from Rio and Portugal and take on only a few projects at a time, because close care is what separates a site that merely exists from a site that brings in clients.',
    talk: "Let's talk",
    seeWork: 'See the work',
    stack: 'Stack',
    alsoWith: 'I also work with',
    howIWork: 'How I work',
    howItems: [
      'Contract + scope',
      'Installment payments',
      'Staging from day 1',
      'Code in your GitHub',
      '30-day warranty',
      'No lock-in',
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    titleA: 'What people',
    titleEm: 'usually ask',
    titleB: '.',
    items: [
      {
        q: 'Why {price} and not {cheap} like a lot of freelancers charge?',
        a: "Because it's not the same product. {cheap} usually buys an Elementor template with no strategy, one that lags on mobile and that you can't edit later. Here you get custom Next.js code, design built around your business, real integrations, green Core Web Vitals and the code in your GitHub at the end.",
      },
      {
        q: 'How long until the site is ready?',
        a: '3 to 7 weeks depending on scope. The schedule is fixed in the proposal, with milestones and dates.',
      },
      {
        q: 'Do you work with a contract and installment payments?',
        a: 'Yes. A service agreement with defined scope and timeline. Payment in 3 installments: 40% upfront, 30% on design approval, 30% on delivery. Bank transfer, or PIX and boleto for clients in Brazil.',
      },
      {
        q: 'What about maintenance after delivery?',
        a: 'You get the site live on Vercel, with documentation. If you want, you can hire an ongoing monthly plan with prioritized improvements and priority support.',
      },
      {
        q: 'Do you use ready-made templates?',
        a: 'No. Code from scratch, in Next.js + Tailwind or PHP depending on the project. No Elementor or WordPress themes. The code is yours — no lock-in.',
      },
      {
        q: 'Do you work with clients outside Rio de Janeiro?',
        a: 'Yes: all over Brazil, Portugal and other countries. Meetings on Google Meet, WhatsApp for day-to-day, and a staging environment so you can follow along in real time.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    titleA: 'Ready to get your site',
    titleEm: 'off the ground',
    titleB: '?',
    lead: "Send me a quick summary of the project. If it's a fit, I'll set up a 30-minute call to understand it better and send back a proposal within 3 days.",
    preview: 'Free preview',
    previewText: '5-min questionnaire, preview on WhatsApp',
    whatsapp: 'WhatsApp',
    email: 'Email',
  },

  form: {
    name: 'Name',
    namePlaceholder: 'What should we call you?',
    email: 'Email',
    emailPlaceholder: 'you@domain.com',
    project: 'What kind of project?',
    projects: ['Business website', 'E-commerce', 'Conversion landing page', 'Custom system', 'Not sure yet'],
    budget: 'Budget range',
    budgetUpTo: 'Up to {amount}',
    budgetAbove: 'Over {amount}',
    message: 'About the project',
    messagePlaceholder: 'Briefly tell me what the company does, what you need and your ideal timeline.',
    footnote: 'Sending opens WhatsApp with your message ready · reply within 24h.',
    send: 'Send on WhatsApp',
    waIntro: "Hi! I found MX Studio Web's website.",
    waProject: 'Project',
    waBudget: 'Budget',
    errorName: 'Please tell me your name.',
    errorEmail: 'Invalid email.',
    errorMessage: 'Tell me a little more about the project.',
    sentTitle: 'Almost there!',
    sentText:
      "WhatsApp is open with your message, {name}. Just tap send there — I'll reply within 24 hours.",
    sentRetry: "WhatsApp didn't open? Tap here.",
  },

  footer: {
    tagline: 'Digital studio',
    description:
      'Custom websites that bring in clients for clinics, law firms and shops. One person from brief to delivery.',
    location: 'Rio de Janeiro · Portugal · serving Brazil and abroad',
    portfolio: 'Portfolio',
    work: 'Work',
    process: 'Process',
    services: 'Services',
    about: 'About',
    demos: 'Demos',
    demoLinks: {
      'moda-arte': 'E-commerce',
      'restaurante-terra': 'Restaurant',
      'clinica-sereno': 'Clinic',
      'motta-advogados': 'Law firm',
      'costa-imoveis': 'Real estate',
      'rota-clara': 'Online course',
      'lumi-odonto': 'Dentistry',
      'iris-estetica': 'Aesthetics',
      'alicerce-construtora': 'Construction',
      'mare-salao': 'Salon',
    },
    ctaEyebrow: 'Shall we talk?',
    ctaTitle: 'I reply within 24 hours.',
    sendEmail: 'Send an email',
    rights: 'Digital studio · All rights reserved',
    madeWith: 'Handmade with Next.js',
  },
};
