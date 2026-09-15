import type { Messages } from './pt';

export const es: Messages = {
  meta: {
    title: 'MX Studio · Estudio digital freelance',
    description:
      'Sitios web, e-commerce y productos digitales a medida en Next.js. Portafolio con demos funcionales en 9 nichos: e-commerce, gastronomía, salud, odontología, estética, legal, inmobiliario, construcción e infoproductos.',
    keywords: [
      'desarrollador next.js freelance',
      'desarrollador web freelance',
      'sitios web a medida',
      'e-commerce next.js',
      'Río de Janeiro',
      'MX Studio',
    ],
    ogDescription:
      'Sitios que hacen que tu negocio parezca serio — y que venden. Portafolio con 9 demos funcionales.',
  },

  nav: {
    home: 'Inicio',
    work: 'Trabajos',
    process: 'Proceso',
    about: 'Nosotros',
    studio: 'Estudio',
    homeAria: 'MX Studio · Estudio',
    mainNav: 'Principal',
    mobileNav: 'Móvil',
    backShort: '← Portafolio',
    backLong: '← Volver al portafolio',
    startProject: 'Iniciar proyecto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },

  prefs: {
    label: 'Idioma y moneda',
    language: 'Idioma',
    currency: 'Moneda',
    currencies: {
      BRL: 'Real brasileño',
      USD: 'Dólar estadounidense',
      EUR: 'Euro',
      GBP: 'Libra esterlina',
      BTC: 'Bitcoin',
    },
    ratesNote: 'Los precios en otras monedas se convierten desde el real al tipo de cambio del día.',
  },

  whatsappMsg: '¡Hola! Vi el portafolio de MX Studio y quería hablar sobre un proyecto.',

  hero: {
    badge: 'Disponible para 2 proyectos en octubre',
    titleA: 'Sitios que hacen que tu negocio parezca',
    titleEm: 'serio',
    titleB: '— y que',
    titleAccent: 'venden',
    leadA: 'Somos',
    leadB:
      'Creamos sitios web, e-commerce y productos digitales a medida en Next.js. Del brief al post-lanzamiento, una sola persona. Sin plantillas. Sin intermediarios. Sin sorpresas.',
    whatsapp: 'Hablar por WhatsApp',
    seeWork: 'Ver los trabajos',
    stats: [
      { kpi: '9', label: 'demos para que pruebes' },
      { kpi: '100%', label: 'código en tu GitHub' },
      { kpi: '3–7', label: 'semanas por proyecto' },
      { kpi: '24h', label: 'para responder' },
    ],
  },

  marquee: [
    'E-commerce',
    'Restaurantes',
    'Clínicas',
    'Odontología',
    'Estética',
    'Abogados',
    'Inmobiliarias',
    'Constructoras',
    'Infoproductos',
  ],

  work: {
    eyebrow: 'Trabajos',
    titleA: 'Cada tarjeta abre una',
    titleEm: 'demo funcional',
    titleB: ' del sitio.',
    lead: 'Haz clic, prueba los botones, añade al carrito, haz una reserva. Si funciona aquí, funciona en el tuyo.',
    note: 'LCP y peso medidos en producción, sin caché, en 4G con CPU 4× más lenta: el peor de 3 resultados. No hace falta creernos: pega la URL de cualquier demo en PageSpeed Insights de Google y compruébalo.',
    count: '09 nichos · demos completas',
    openDemo: 'Abrir demo de {name}',
    number: 'Nº',
    cursor: 'Abrir demo',
    filters: {
      all: 'Todos',
      saude: 'Salud y estética',
      local: 'Negocios locales',
      digital: 'Ventas online',
    },
    cards: {
      'moda-arte': {
        vertical: 'E-commerce',
        tagline: 'Tienda de moda de autor',
        metrics: [
          { label: '1.8s', value: 'LCP en 4G' },
          { label: '741 KB', value: 'la página entera' },
          { label: 'PIX', value: 'en el checkout' },
        ],
      },
      'restaurante-terra': {
        vertical: 'Gastronomía',
        tagline: 'Restaurante de alta cocina',
        metrics: [
          { label: '1.7s', value: 'LCP en 4G' },
          { label: '397 KB', value: 'la página entera' },
          { label: '24/7', value: 'reservas sin llamar' },
        ],
      },
      'clinica-sereno': {
        vertical: 'Salud',
        tagline: 'Clínica multidisciplinar',
        metrics: [
          { label: '1.8s', value: 'LCP en 4G' },
          { label: '465 KB', value: 'la página entera' },
          { label: '0', value: 'de layout shift' },
        ],
      },
      'motta-advogados': {
        vertical: 'Abogacía',
        tagline: 'Despacho de abogados',
        metrics: [
          { label: '1.2s', value: 'LCP en 4G' },
          { label: '489 KB', value: 'la página entera' },
          { label: 'OAB', value: 'Prov. 205/2021' },
        ],
      },
      'costa-imoveis': {
        vertical: 'Inmobiliaria',
        tagline: 'Escaparate inmobiliario boutique',
        metrics: [
          { label: '1.7s', value: 'LCP en 4G' },
          { label: '679 KB', value: 'la página entera' },
          { label: 'Filtro', value: 'en tiempo real' },
        ],
      },
      'rota-clara': {
        vertical: 'Infoproducto',
        tagline: 'Curso online + landing de ventas',
        metrics: [
          { label: '1.8s', value: 'LCP en 4G' },
          { label: '735 KB', value: 'la página entera' },
          { label: 'Checkout', value: 'en 3 pasos' },
        ],
      },
      'lumi-odonto': {
        vertical: 'Odontología',
        tagline: 'Clínica dental estética',
        metrics: [
          { label: 'Simulador', value: 'de blanqueamiento' },
          { label: 'Cita', value: 'en 3 pasos' },
          { label: 'CRO', value: 'responsable técnico' },
        ],
      },
      'iris-estetica': {
        vertical: 'Estética',
        tagline: 'Clínica de estética avanzada',
        metrics: [
          { label: 'Quiz', value: 'de evaluación' },
          { label: 'Paquetes', value: 'precio en tiempo real' },
          { label: 'Filtro', value: 'por zona del cuerpo' },
        ],
      },
      'alicerce-construtora': {
        vertical: 'Construcción',
        tagline: 'Constructora y reformas',
        metrics: [
          { label: 'Presupuesto', value: 'en tiempo real' },
          { label: 'Obras', value: 'con filtro' },
          { label: 'Etapas', value: 'de la obra' },
        ],
      },
    },
  },

  process: {
    eyebrow: 'Proceso',
    titleA: 'Una forma',
    titleEm: 'sin sorpresas',
    titleB: ' de hacer tu sitio.',
    steps: [
      {
        title: 'Discovery',
        duration: '3–5 días',
        text: 'Sesión de inmersión. Entiendo el negocio, el público y lo que ya funciona. Salgo con un brief y una propuesta de arquitectura.',
      },
      {
        title: 'Diseño',
        duration: '1–2 semanas',
        text: 'Wireframes rápidos, dirección de arte y pantallas de alta fidelidad. Tú apruebas antes de cualquier código.',
      },
      {
        title: 'Desarrollo',
        duration: '2–4 semanas',
        text: 'Implementación en Next.js + Tailwind. Lo sigues en un entorno de staging desde el día 1.',
      },
      {
        title: 'Lanzamiento',
        duration: '2–3 días',
        text: 'Deploy en dominio propio, analytics + SEO técnico y traspaso con documentación.',
      },
    ],
  },

  services: {
    eyebrow: 'Servicios',
    titleA: 'Lo que suelo hacer,',
    titleEm: 'con plazos y precios claros',
    titleB: '.',
    from: 'desde',
    items: [
      { title: 'Sitio institucional', bullets: ['4–8 páginas', 'CMS opcional', 'Design system propio', 'SEO técnico'] },
      { title: 'E-commerce', bullets: ['Catálogo + carrito', 'Checkout con PIX + tarjeta', 'Área de cliente', 'Panel del vendedor'] },
      { title: 'Landing de conversión', bullets: ['Copywriting-first', 'Lista para A/B', 'Analytics + píxeles', 'Online en 10 días'] },
      { title: 'Sistema web a medida', bullets: ['Login + auth', 'Panel + roles', 'Integraciones', 'Alcance personalizado'] },
    ],
  },

  about: {
    eyebrow: 'Nosotros',
    titleA: 'Una',
    titleEm: 'sola persona',
    titleB: ' del brief a la entrega.',
    p1: 'MX Studio nació en Río de Janeiro, entre agencias, producto y consultoría, hasta convertirse en un estudio independiente. Lo que aprendimos: el cliente no quiere un sitio, quiere que el sitio resuelva.',
    p2: 'Trabajamos con un equipo reducido y hacemos pocos proyectos a la vez porque creemos que el cuidado cercano es lo que separa un sitio que solo existe de un sitio que vende.',
    talk: 'Hablemos',
    seeWork: 'Ver los trabajos',
    stack: 'Stack',
    alsoWith: 'También trabajo con',
    howIWork: 'Cómo trabajo',
    howItems: [
      'Contrato + alcance',
      'Pago en cuotas',
      'Staging desde el día 1',
      'Código en tu GitHub',
      '30 días de garantía',
      'Sin lock-in',
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    titleA: 'Lo que la gente',
    titleEm: 'suele preguntar',
    titleB: '.',
    items: [
      {
        q: '¿Por qué {price} y no {cheap} como cobran muchos freelancers?',
        a: 'Porque no es el mismo producto. {cheap} suele ser una plantilla de Elementor sin estrategia, que va lenta en el móvil y que luego no puedes editar. Aquí es código propio en Next.js, diseño pensado para tu negocio, integraciones reales, Core Web Vitals en verde y el código en tu GitHub al final.',
      },
      {
        q: '¿En cuánto tiempo está listo el sitio?',
        a: 'De 3 a 7 semanas según el alcance. El cronograma queda cerrado en la propuesta, con hitos y fechas.',
      },
      {
        q: '¿Trabajas con contrato y pago en cuotas?',
        a: 'Sí. Contrato de prestación de servicios con alcance y plazo. Pago en 3 cuotas: 40% al inicio, 30% al aprobar el diseño y 30% en la entrega. Transferencia bancaria, o PIX y boleto para clientes en Brasil.',
      },
      {
        q: 'Después de la entrega, ¿cómo queda el mantenimiento?',
        a: 'Recibes el sitio publicado en Vercel, con documentación. Si quieres, contratas un plan mensual con mejoras priorizadas y soporte prioritario.',
      },
      {
        q: '¿Usas plantillas?',
        a: 'No. Código desde cero en Next.js + Tailwind. Nada de Elementor ni temas de WordPress. El código es tuyo, sin lock-in.',
      },
      {
        q: '¿Atiendes fuera de Río de Janeiro?',
        a: 'Sí, en todo Brasil y en el exterior. Reuniones por Meet, WhatsApp para el día a día y un entorno de staging para seguir el avance en tiempo real.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contacto',
    titleA: '¿Llevamos tu sitio',
    titleEm: 'del papel a la web',
    titleB: '?',
    lead: 'Mándame un resumen del proyecto. Si encaja, agendo una llamada de 30 min para entenderlo mejor y te envío una propuesta en un máximo de 3 días.',
    whatsapp: 'WhatsApp',
    email: 'Correo',
  },

  form: {
    name: 'Nombre',
    namePlaceholder: '¿Cómo quieres que te llame?',
    email: 'Correo',
    emailPlaceholder: 'tu@dominio.com',
    project: '¿Qué tipo de proyecto?',
    projects: ['Sitio institucional', 'E-commerce', 'Landing de conversión', 'Sistema a medida', 'Aún no lo sé'],
    budget: 'Rango de inversión',
    budgetUpTo: 'Hasta {amount}',
    budgetAbove: 'Más de {amount}',
    message: 'Sobre el proyecto',
    messagePlaceholder: 'Cuéntame brevemente a qué se dedica la empresa, qué necesita y un plazo deseado.',
    footnote: 'Respuesta en 24h · tus datos no van a ninguna parte.',
    sending: 'Enviando…',
    send: 'Enviar',
    errorName: 'Dime tu nombre, por favor.',
    errorEmail: 'Correo no válido.',
    errorMessage: 'Cuéntame un poco más sobre el proyecto.',
    sentTitle: '¡Recibido!',
    sentText:
      'Gracias, {name}. Te respondo en un máximo de 24 horas con una invitación a una llamada o una propuesta preliminar. ¿Seguimos por WhatsApp mientras tanto?',
  },

  footer: {
    tagline: 'Estudio digital',
    description:
      'Sitios web, e-commerce y productos digitales a medida para marcas que quieren ser tomadas en serio. Del brief a la entrega, una sola persona.',
    location: 'Río de Janeiro · atiende Brasil y el exterior',
    portfolio: 'Portafolio',
    work: 'Trabajos',
    process: 'Proceso',
    services: 'Servicios',
    about: 'Nosotros',
    demos: 'Demos',
    demoLinks: {
      'moda-arte': 'E-commerce',
      'restaurante-terra': 'Restaurante',
      'clinica-sereno': 'Clínica',
      'motta-advogados': 'Abogacía',
      'costa-imoveis': 'Inmobiliaria',
      'rota-clara': 'Infoproducto',
      'lumi-odonto': 'Odontología',
      'iris-estetica': 'Estética',
      'alicerce-construtora': 'Construcción',
    },
    ctaEyebrow: '¿Hablamos?',
    ctaTitle: 'Respondo en menos de 24 horas.',
    sendEmail: 'Enviar correo',
    rights: 'Estudio digital · Todos los derechos reservados',
    madeWith: 'Hecho a mano con Next.js',
  },
};
