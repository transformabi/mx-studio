import type { Messages } from './pt';

export const en: Messages = {
  meta: {
    title: 'MX Studio Web · Websites that bring customers',
    description:
      'Custom website studio in Rio de Janeiro: fast sites that turn visits into WhatsApp chats, for clinics, law firms and local businesses in Brazil and abroad.',
  },

  nav: {
    work: 'Work',
    process: 'Process',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    cta: 'Sites for small businesses',
    home: 'MX Studio Web, home page',
    menuLabel: 'Main navigation',
    menu: 'Open menu',
    close: 'Close menu',
    language: 'Language',
    skip: 'Skip to content',
  },

  whatsappMsg: 'Hi! I came across the MX Studio Web website and would like to talk about a website.',

  hero: {
    eyebrow: 'Website studio · Rio de Janeiro, Brazil',
    titleA: 'Websites that bring',
    titleAccent: 'customers',
    titleB: 'to your business.',
    lead: 'Custom websites for clinics, law firms, shops and local businesses: fast on mobile and built to turn visits into conversations. You talk directly to the person who designs and builds it.',
    primary: 'Sites for small businesses',
    note: 'Three plans with a setup fee + monthly maintenance, live in 14 days, on this page.',
    secondary: 'Message on WhatsApp',
    caseLabel: 'Real client · sulamitaestetica.pt',
    desktopAlt: "Home page of Sulamita Nascimento's website on a computer",
    mobileAlt: "Sulamita Nascimento's website on a phone",
  },

  case: {
    label: 'Real client',
    name: 'Sulamita Nascimento',
    business: 'Estética de Resultados',
    text: 'Bilingual website for an aesthetics specialist in Caldas da Rainha, Portugal. It presents the treatments, builds trust and takes clients straight to booking a consultation.',
    facts: [
      { label: 'Domain', value: 'sulamitaestetica.pt' },
      { label: 'Languages', value: 'Portuguese and English' },
      { label: 'Live since', value: 'September 2026' },
    ],
    visit: 'See the live website',
    imageAlt: "Home page of Sulamita Nascimento's website, scrolling down to the treatments",
  },

  work: {
    label: 'Models',
    title: 'Website models by industry, fully working.',
    lead: 'Each model is a complete website built by MX Studio Web for a fictional business. Open it, click around, book a table or fill a cart: that is how yours will work.',
    badge: 'Demo website',
    open: 'Open',
    lcp: 'Loads in {value} on 4G',
    note: 'Load time measured with Google Lighthouse (the same engine as PageSpeed Insights), without cache, on simulated 4G with a 4× slower CPU: the worst of 3 runs.',
    cta: 'I want a website like this',
    imageAlt: 'Home page of the {name} model',
    niches: {
      saude: 'Healthcare',
      beleza: 'Beauty and aesthetics',
      advocacia: 'Law firm',
      lojas: 'Online store',
      restaurantes: 'Restaurant',
      imobiliarias: 'Real estate',
      construcao: 'Construction',
      cursos: 'Online course',
    },
    cards: {
      'clinica-sereno': 'Multidisciplinary clinic with online booking',
      'motta-advogados': 'Law firm with case intake',
      'moda-arte': 'Fashion store with cart and checkout',
      'restaurante-terra': 'Restaurant with menu and reservations',
      'costa-imoveis': 'Real estate company with live property search',
      'rota-clara': 'Sales page for an online course',
    },
  },

  process: {
    label: 'How it works',
    title: 'From first contact to launch, with no surprises.',
    lead: 'On the Launch, Business and Growth plans, all four stages fit in 14 days.',
    steps: [
      {
        title: 'Discovery',
        duration: '1 to 2 days',
        text: 'A conversation to understand the business, the audience and what already works. I come out of it with the brief and the site structure.',
      },
      {
        title: 'Design',
        duration: '3 to 4 days',
        text: 'Visual direction and page designs. You approve everything before a single line of code.',
      },
      {
        title: 'Development',
        duration: '5 to 7 days',
        text: 'The site is built, with a preview link so you can follow along from day one.',
      },
      {
        title: 'Launch',
        duration: '1 day',
        text: 'The site goes live on your domain, with technical SEO, visit tracking and a user guide.',
      },
    ],
  },

  pricing: {
    payments: {
      title: 'Payment methods',
      methods: ['PIX (Brazil)', 'Credit card, in instalments', 'Wise, for clients outside Brazil'],
      abroad: 'Outside Brazil? You pay in your currency through Wise.',
    },
    plans: {
      label: 'Small business plans',
      title: 'Your website live in 14 days, from {price}.',
      lead: 'Fixed prices: a one-time setup fee plus monthly maintenance. Pick your currency to see the amounts.',
      currencyLabel: 'Currency',
      approx: 'Converted at the exchange rate on the day the site was published; the reference price is in euros.',
      setupLabel: 'Setup',
      monthlyLabel: 'Maintenance',
      per: '/mo',
      plus: '+',
      featured: 'Most popular',
      delivery: 'Live in {days} days',
      cta: 'Get the {plan} plan',
      checkout: 'Get {plan} and pay online',
      whatsapp: 'Questions? Ask on WhatsApp',
      secure: 'Secure payment by Stripe: the setup fee is charged with the first payment and maintenance every month. Checkout shows the amount in your local currency.',
      email: 'Prefer email?',
      emailSubject: '{plan} plan — MX Studio Web',
      askMsg: 'Hi! I came across the MX Studio Web website and I want the {plan} plan: {setup} setup + {monthly}/mo maintenance, live in 14 days.',
      maintenance: 'Monthly maintenance covers hosting, updates, security, backups and small text and image changes.',
      plans: {
        launch: {
          name: 'Launch',
          text: 'One page to present your business and get enquiries.',
          bullets: ['One page, up to 3 sections', 'Responsive design', 'Contact form + WhatsApp', 'Basic SEO', '1 round of revisions'],
        },
        business: {
          name: 'Business',
          text: 'The complete website for a small business.',
          bullets: ['Up to 5 pages', 'Custom design for your brand', 'On-page SEO + Google Analytics', 'Contact form + WhatsApp', '3 rounds of revisions'],
        },
        growth: {
          name: 'Growth',
          text: 'For businesses that want new leads every month.',
          bullets: ['Up to 10 pages', 'Editable blog or portfolio', 'Booking or lead capture', 'Advanced SEO + speed tuning', 'Priority support'],
        },
      },
    },
  },

  about: {
    label: 'About',
    title: 'Who builds your website.',
    p1: "I'm Max Costa, founder of MX Studio Web. I personally handle every project, from the first conversation to launch: you talk directly to the person who designs and builds it.",
    p2: 'I also run a data and BI consultancy. That is why I treat a website as a business tool: it exists to bring in leads, and that can be measured.',
    points: [
      'Direct contact, no middlemen',
      'Contract with scope and timeline',
      'Domain and code in your name',
      'Based in Rio de Janeiro, serving clients worldwide',
    ],
    photoAlt: 'Max Costa, founder of MX Studio Web',
    role: 'Founder of MX Studio Web',
  },

  faq: {
    label: 'FAQ',
    title: 'What people usually ask.',
    items: [
      {
        q: 'How does the free preview work?',
        a: 'You answer a 5-minute questionnaire and send your logo and a few photos. I put together a preview of a website for your business and send it on WhatsApp. No commitment.',
      },
      {
        q: 'How long does it take?',
        a: 'On the Launch, Business and Growth plans, your website goes live in 14 days. Custom projects have their own timeline, with dates for each stage in the proposal.',
      },
      {
        q: 'How does payment work?',
        a: 'The Launch, Business and Growth plans have a setup fee and a monthly maintenance fee. I accept PIX, credit card in instalments and Wise for clients outside Brazil. Custom projects come with a contract and payment in 3 stages: 40% upfront, 30% on design approval and 30% on delivery.',
      },
      {
        q: 'Do you use templates?',
        a: 'No. Every website is designed and built for your business. At the end, the domain and the code are in your name, with no lock-in.',
      },
      {
        q: 'What happens after launch?',
        a: 'You get a user guide and a 30-day warranty for fixes. If you like, you can hire a monthly plan and I take care of the changes.',
      },
      {
        q: 'Do you work with clients outside Brazil?',
        a: 'Yes. I work with clients across Brazil, Portugal and other countries, over video calls and WhatsApp. Clients outside Brazil pay through Wise, in their own currency.',
      },
    ],
  },

  contact: {
    label: 'Contact',
    title: 'Shall we talk about your website?',
    lead: 'Tell me briefly about your business. I reply within 24 hours on business days.',
    channels: {
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      instagram: 'Instagram',
      preview: 'Free preview',
      previewText: '5-minute questionnaire',
    },
    form: {
      name: 'Name',
      namePlaceholder: 'What should I call you?',
      email: 'E-mail',
      emailPlaceholder: 'you@company.com',
      project: 'Project type',
      projects: ['Launch plan', 'Business plan', 'Growth plan', 'Other / not sure yet'],
      budget: 'Budget',
      budgetUpTo: 'Up to {amount}',
      budgetAbove: 'Over {amount}',
      message: 'About the project',
      messagePlaceholder: 'What the company does, what it needs and by when.',
      footnote: 'Sending opens WhatsApp with your message ready.',
      send: 'Send via WhatsApp',
      waIntro: 'Hi! I came across the MX Studio Web website.',
      waProject: 'Project',
      waBudget: 'Budget',
      errorName: 'Please enter your name.',
      errorEmail: 'Please check the e-mail.',
      errorMessage: 'Tell me a bit more about the project.',
      sentTitle: 'Almost there',
      sentText: 'I opened WhatsApp with your message, {name}. Just tap send there.',
      sentRetry: "WhatsApp didn't open? Tap here.",
    },
  },

  footer: {
    blurb: 'Custom websites that bring customers. Rio de Janeiro, serving clients worldwide.',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    languagesTitle: 'Languages',
    rights: 'All rights reserved.',
    location: 'Rio de Janeiro, Brazil',
  },

  demo: {
    badge: 'Demo website',
    description: '{name} is a website model built by MX Studio Web for a fictional business. Open it and try it: everything works.',
  },
};
