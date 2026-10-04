import type { Messages } from './pt';

export const es: Messages = {
  meta: {
    title: 'MX Studio Web · Sitios web que traen clientes',
    description:
      'Estudio de webs a medida en Río de Janeiro: webs rápidas que convierten visitas en chats de WhatsApp, para clínicas, despachos y negocios de todo el mundo.',
  },

  nav: {
    work: 'Trabajos',
    process: 'Proceso',
    pricing: 'Precios',
    about: 'Sobre mí',
    contact: 'Contacto',
    cta: 'Pedir vista previa gratis',
    home: 'MX Studio Web, página de inicio',
    menuLabel: 'Navegación principal',
    menu: 'Abrir menú',
    close: 'Cerrar menú',
    language: 'Idioma',
    skip: 'Saltar al contenido',
  },

  whatsappMsg: '¡Hola! Llegué por el sitio de MX Studio Web y quiero hablar sobre un sitio web.',

  hero: {
    eyebrow: 'Estudio de sitios web · Río de Janeiro, Brasil',
    titleA: 'Sitios web que traen',
    titleAccent: 'clientes',
    titleB: 'a tu negocio.',
    lead: 'Sitios a medida para clínicas, despachos, tiendas y negocios locales: rápidos en el móvil y hechos para convertir visitas en conversaciones. Hablas directamente con quien diseña y programa.',
    primary: 'Pedir vista previa gratis',
    note: 'Un cuestionario de 5 minutos. La vista previa llega a tu WhatsApp.',
    secondary: 'Escribir por WhatsApp',
    caseLabel: 'Cliente real · sulamitaestetica.pt',
    desktopAlt: 'Página de inicio del sitio de Sulamita Nascimento en un ordenador',
    mobileAlt: 'Sitio de Sulamita Nascimento en el móvil',
  },

  case: {
    label: 'Cliente real',
    title: 'Sulamita Nascimento, Estética de Resultados',
    text: 'Sitio bilingüe para una especialista en estética en Caldas da Rainha, Portugal. Presenta los tratamientos, transmite confianza y lleva a la clienta directamente a reservar la consulta.',
    facts: [
      { label: 'Dominio', value: 'sulamitaestetica.pt' },
      { label: 'Idiomas', value: 'Portugués e inglés' },
      { label: 'En línea desde', value: 'Septiembre de 2026' },
    ],
    visit: 'Ver el sitio en línea',
    imageAlt: 'Sección de tratamientos del sitio de Sulamita Nascimento',
  },

  work: {
    label: 'Modelos',
    title: 'Modelos de sitio por sector, funcionando de verdad.',
    lead: 'Cada modelo es un sitio completo creado por MX Studio Web para un negocio ficticio. Ábrelo, haz clic, reserva una mesa o llena un carrito: así funcionará el tuyo.',
    badge: 'Modelo de demostración',
    open: 'Abrir',
    lcp: 'Carga en {value} en 4G',
    note: 'Tiempo de carga medido con Google Lighthouse (el mismo motor de PageSpeed Insights), sin caché, en 4G simulado con un procesador 4× más lento: el peor de 3 mediciones.',
    cta: 'Quiero un sitio así',
    imageAlt: 'Página de inicio del modelo {name}',
    niches: {
      saude: 'Salud',
      beleza: 'Belleza y estética',
      advocacia: 'Despacho de abogados',
      lojas: 'Tienda online',
      restaurantes: 'Restaurante',
      imobiliarias: 'Inmobiliaria',
      construcao: 'Construcción',
      cursos: 'Curso online',
    },
    cards: {
      'clinica-sereno': 'Clínica multidisciplinar con agenda online',
      'motta-advogados': 'Despacho de abogados con evaluación de casos',
      'moda-arte': 'Tienda de moda con carrito y pago',
      'restaurante-terra': 'Restaurante con carta y reservas',
      'costa-imoveis': 'Inmobiliaria con búsqueda de inmuebles en tiempo real',
      'rota-clara': 'Página de ventas de un curso online',
    },
  },

  process: {
    label: 'Cómo funciona',
    title: 'Del primer contacto al sitio en línea, sin sorpresas.',
    lead: 'Estas etapas se aplican a sitios corporativos, tiendas online y sistemas a medida. Una landing page queda en línea en 10 días como máximo.',
    steps: [
      {
        title: 'Descubrimiento',
        duration: '3 a 5 días',
        text: 'Una conversación para entender el negocio, el público y lo que ya funciona. Salgo de ella con el brief y la estructura del sitio.',
      },
      {
        title: 'Diseño',
        duration: '1 a 2 semanas',
        text: 'Dirección visual y pantallas del sitio. Apruebas todo antes de cualquier línea de código.',
      },
      {
        title: 'Desarrollo',
        duration: '2 a 4 semanas',
        text: 'Programación del sitio, con un enlace de vista previa para que lo sigas desde el primer día.',
      },
      {
        title: 'Lanzamiento',
        duration: '2 a 3 días',
        text: 'El sitio en línea en tu dominio, con SEO técnico, medición de visitas y una guía de uso.',
      },
    ],
  },

  pricing: {
    label: 'Servicios y precios',
    title: 'Precios claros desde la primera conversación.',
    lead: 'Precios de partida. El presupuesto final llega por escrito, con alcance y plazo, después de entender tu proyecto.',
    from: 'desde',
    currency: 'Moneda',
    approx: 'Los precios en otras monedas son aproximados, convertidos desde el real brasileño al tipo de cambio del día en que se publicó el sitio.',
    items: {
      landing: {
        title: 'Landing page',
        text: 'Una página centrada en una oferta o servicio.',
        bullets: ['Textos pensados para vender', 'WhatsApp y formulario', 'Medición de visitas y anuncios', 'En línea en 10 días como máximo'],
      },
      institucional: {
        title: 'Sitio corporativo',
        text: 'El sitio completo de tu empresa.',
        bullets: ['De 4 a 8 páginas', 'Diseño exclusivo', 'SEO técnico', 'Edición de textos (opcional)'],
      },
      ecommerce: {
        title: 'Tienda online',
        text: 'Para vender por internet.',
        bullets: ['Catálogo y carrito', 'Pago con tarjeta y PIX', 'Área del cliente', 'Panel de la tienda'],
      },
      sistema: {
        title: 'Sistema a medida',
        text: 'Cuando el sitio necesita hacer más.',
        bullets: ['Login y niveles de acceso', 'Panel de administración', 'Integraciones', 'Alcance a medida'],
      },
    },
    ask: 'Pedir presupuesto',
    askMsg: '¡Hola! Llegué por el sitio de MX Studio Web y quiero un presupuesto de: {service}.',
    payments: {
      title: 'Formas de pago',
      methods: ['PIX (Brasil)', 'Tarjeta de crédito, en cuotas', 'Wise, para clientes de otros países'],
      terms: 'Contrato con alcance y plazo. Pago en 3 etapas: 40% al inicio, 30% al aprobar el diseño y 30% en la entrega.',
      abroad: '¿Estás fuera de Brasil? Te envío el presupuesto en tu moneda y pagas por Wise.',
    },
  },

  about: {
    label: 'Sobre mí',
    title: 'Quién hace tu sitio.',
    p1: 'Soy Max Costa, fundador de MX Studio Web. Me ocupo personalmente de cada proyecto, de la primera conversación al sitio en línea: hablas directamente con quien diseña y programa.',
    p2: 'También tengo una consultora de datos y BI. Por eso trato el sitio como una herramienta de negocio: existe para traer contactos, y eso se puede medir.',
    points: [
      'Trato directo, sin intermediarios',
      'Contrato con alcance y plazo',
      'Dominio y código a tu nombre',
      'Río de Janeiro, atendiendo clientes de todo el mundo',
    ],
    photoAlt: 'Max Costa, fundador de MX Studio Web',
    role: 'Fundador de MX Studio Web',
  },

  faq: {
    label: 'Preguntas frecuentes',
    title: 'Lo que suelen preguntar.',
    items: [
      {
        q: '¿Cómo funciona la vista previa gratis?',
        a: 'Respondes un cuestionario de 5 minutos y envías tu logo y algunas fotos. Preparo una vista previa del sitio para tu negocio y te la mando por WhatsApp. Sin compromiso.',
      },
      {
        q: '¿Cuánto tarda el sitio?',
        a: 'Landing page: hasta 10 días. Sitios más grandes, de 4 a 7 semanas, según el tamaño del proyecto. El calendario va en la propuesta, con las fechas de cada etapa.',
      },
      {
        q: '¿Cómo es el pago?',
        a: 'Con contrato, en 3 etapas: 40% al inicio, 30% al aprobar el diseño y 30% en la entrega. Acepto PIX, tarjeta de crédito en cuotas y Wise para clientes fuera de Brasil.',
      },
      {
        q: '¿Usas plantillas?',
        a: 'No. Cada sitio se diseña y programa para tu negocio. Al final, el dominio y el código quedan a tu nombre, sin permanencia.',
      },
      {
        q: '¿Y después del lanzamiento?',
        a: 'Recibes una guía de uso y 30 días de garantía para correcciones. Si quieres, contratas un plan mensual y yo me ocupo de los cambios.',
      },
      {
        q: '¿Trabajas con clientes fuera de Brasil?',
        a: 'Sí. Atiendo todo Brasil, Portugal y otros países, por videollamada y WhatsApp. Los clientes fuera de Brasil pagan por Wise, en su propia moneda.',
      },
    ],
  },

  contact: {
    label: 'Contacto',
    title: '¿Hablamos de tu sitio web?',
    lead: 'Cuéntame brevemente sobre tu negocio. Respondo en menos de 24 horas en días laborables.',
    channels: {
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      instagram: 'Instagram',
      preview: 'Vista previa gratis',
      previewText: 'Cuestionario de 5 minutos',
    },
    form: {
      name: 'Nombre',
      namePlaceholder: '¿Cómo te llamo?',
      email: 'E-mail',
      emailPlaceholder: 'tu@empresa.com',
      project: 'Tipo de proyecto',
      projects: ['Sitio corporativo', 'Tienda online', 'Landing page', 'Sistema a medida', 'Aún no lo sé'],
      budget: 'Presupuesto',
      budgetUpTo: 'Hasta {amount}',
      budgetAbove: 'Más de {amount}',
      message: 'Sobre el proyecto',
      messagePlaceholder: 'Qué hace la empresa, qué necesita y para cuándo.',
      footnote: 'Al enviar, WhatsApp se abre con tu mensaje listo.',
      send: 'Enviar por WhatsApp',
      waIntro: '¡Hola! Llegué por el sitio de MX Studio Web.',
      waProject: 'Proyecto',
      waBudget: 'Presupuesto',
      errorName: 'Escribe tu nombre.',
      errorEmail: 'Revisa el e-mail.',
      errorMessage: 'Cuéntame un poco más sobre el proyecto.',
      sentTitle: 'Casi listo',
      sentText: 'Abrí WhatsApp con tu mensaje, {name}. Solo tienes que tocar enviar allí.',
      sentRetry: '¿No se abrió WhatsApp? Toca aquí.',
    },
  },

  footer: {
    blurb: 'Sitios web a medida que traen clientes. Río de Janeiro, atendiendo clientes de todo el mundo.',
    navTitle: 'Navegación',
    contactTitle: 'Contacto',
    languagesTitle: 'Idiomas',
    rights: 'Todos los derechos reservados.',
    location: 'Río de Janeiro, Brasil',
  },

  demo: {
    badge: 'Modelo de demostración',
    description: '{name} es un modelo de sitio creado por MX Studio Web para un negocio ficticio. Ábrelo y pruébalo: todo funciona.',
  },
};
