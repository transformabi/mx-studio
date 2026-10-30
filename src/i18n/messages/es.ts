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
    cta: 'Sitios para pequeños negocios',
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
    primary: 'Sitios para pequeños negocios',
    note: 'Tres planes con creación + cuota mensual, en línea en 14 días, en esta página.',
    secondary: 'Escribir por WhatsApp',
    caseLabel: 'Cliente real · sulamitaestetica.pt',
    desktopAlt: 'Página de inicio del sitio de Sulamita Nascimento en un ordenador',
    mobileAlt: 'Sitio de Sulamita Nascimento en el móvil',
  },

  case: {
    label: 'Cliente real',
    name: 'Sulamita Nascimento',
    business: 'Estética de Resultados',
    text: 'Sitio bilingüe para una especialista en estética en Caldas da Rainha, Portugal. Presenta los tratamientos, transmite confianza y lleva a la clienta directamente a reservar la consulta.',
    facts: [
      { label: 'Dominio', value: 'sulamitaestetica.pt' },
      { label: 'Idiomas', value: 'Portugués e inglés' },
      { label: 'En línea desde', value: 'Septiembre de 2026' },
    ],
    visit: 'Ver el sitio en línea',
    imageAlt: 'Página de inicio del sitio de Sulamita Nascimento, desplazándose hasta los tratamientos',
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
    lead: 'En los planes Launch, Business y Growth, las cuatro etapas caben en 14 días.',
    steps: [
      {
        title: 'Descubrimiento',
        duration: '1 a 2 días',
        text: 'Una conversación para entender el negocio, el público y lo que ya funciona. Salgo de ella con el brief y la estructura del sitio.',
      },
      {
        title: 'Diseño',
        duration: '3 a 4 días',
        text: 'Dirección visual y pantallas del sitio. Apruebas todo antes de cualquier línea de código.',
      },
      {
        title: 'Desarrollo',
        duration: '5 a 7 días',
        text: 'Programación del sitio, con un enlace de vista previa para que lo sigas desde el primer día.',
      },
      {
        title: 'Lanzamiento',
        duration: '1 día',
        text: 'El sitio en línea en tu dominio, con SEO técnico, medición de visitas y una guía de uso.',
      },
    ],
  },

  pricing: {
    payments: {
      title: 'Formas de pago',
      methods: ['Tarjeta de crédito, Apple Pay y Google Pay', 'Pix (Brasil), para la creación', 'Boleto (Brasil)', 'Wise, acordado directamente conmigo'],
      note: 'En el sitio, todo pasa por Stripe. Con tarjeta contratas el plan completo: la creación en el primer pago y el mantenimiento cada mes. ¿Estás en Brasil y prefieres Pix o boleto? Paga la creación con el enlace de Pix del plan y luego activamos la cuota mensual con tarjeta o boleto. Fuera de Brasil, el checkout muestra el importe en tu moneda. El checkout no ofrece pago en cuotas. ¿Prefieres pagar por Wise? Acuérdalo directamente conmigo por WhatsApp o e-mail, fuera del checkout.',
    },
    plans: {
      label: 'Planes para pequeños negocios',
      title: 'Tu sitio en línea en 14 días, desde {price}.',
      lead: 'Precios cerrados: un pago único de creación y una cuota mensual de mantenimiento. Elige la moneda para ver los valores.',
      currencyLabel: 'Moneda',
      approx: 'Convertido con el tipo de cambio del día de la publicación; el precio de referencia es en euros.',
      setupLabel: 'Creación',
      monthlyLabel: 'Mantenimiento',
      per: '/mes',
      plus: '+',
      featured: 'El más elegido',
      delivery: 'En línea en {days} días',
      cta: 'Quiero el plan {plan}',
      checkout: 'Contratar {plan} y pagar online',
      pix: '¿En Brasil? Paga la creación por Pix o boleto',
      whatsapp: '¿Dudas? Escríbeme por WhatsApp',
      secure: 'Pago seguro con Stripe: la creación se cobra en el primer pago y el mantenimiento cada mes. El checkout muestra el importe en tu moneda local.',
      email: '¿Prefieres correo?',
      emailSubject: 'Plan {plan} — MX Studio Web',
      askMsg: '¡Hola! Llegué por el sitio de MX Studio Web y quiero el plan {plan}: {setup} de creación + {monthly}/mes de mantenimiento, en línea en 14 días.',
      maintenance: 'El mantenimiento mensual incluye alojamiento, actualizaciones, seguridad, copias de seguridad y pequeños cambios de texto e imagen.',
      plans: {
        launch: {
          name: 'Launch',
          text: 'Una página para presentar tu negocio y recibir contactos.',
          bullets: ['Página única de hasta 3 secciones', 'Diseño adaptable', 'Formulario + WhatsApp', 'SEO básico', '1 ronda de ajustes'],
        },
        business: {
          name: 'Business',
          text: 'El sitio completo de un pequeño negocio.',
          bullets: ['Hasta 5 páginas', 'Diseño a medida de tu marca', 'SEO on-page + Google Analytics', 'Formulario + WhatsApp', '3 rondas de ajustes'],
        },
        growth: {
          name: 'Growth',
          text: 'Para negocios que quieren contactos nuevos cada mes.',
          bullets: ['Hasta 10 páginas', 'Blog o portafolio editable', 'Reservas o captación de contactos', 'SEO avanzado + velocidad', 'Soporte prioritario'],
        },
      },
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
        a: 'En los planes Launch, Business y Growth, tu sitio queda en línea en 14 días. Los proyectos a medida tienen su propio plazo, con las fechas de cada etapa en la propuesta.',
      },
      {
        q: '¿Cómo es el pago?',
        a: 'Los planes Launch, Business y Growth tienen un pago de creación y una cuota mensual de mantenimiento. El pago es por Stripe: tarjeta de crédito, Apple Pay o Google Pay para el plan completo; en Brasil, también Pix o boleto para la creación, con la cuota mensual por tarjeta o boleto. Si prefieres pagar por Wise, basta con acordarlo directamente conmigo por WhatsApp o e-mail. Los proyectos a medida tienen contrato y pago en 3 etapas: 40% al inicio, 30% al aprobar el diseño y 30% en la entrega.',
      },
      {
        q: '¿Usas plantillas?',
        a: 'No. Cada sitio se diseña y programa para tu negocio. Al final, el dominio y el código quedan a tu nombre, sin permanencia.',
      },
      {
        q: '¿Y después del lanzamiento?',
        a: 'Recibes una guía de uso y 30 días de garantía para correcciones. Después, el mantenimiento mensual del plan cubre hosting, actualizaciones, seguridad, copias de seguridad y pequeños cambios de texto e imagen.',
      },
      {
        q: '¿Trabajas con clientes fuera de Brasil?',
        a: 'Sí. Atiendo todo Brasil, Portugal y otros países, por videollamada y WhatsApp. Los clientes fuera de Brasil pagan por Stripe con tarjeta, en su propia moneda, o por Wise, acordándolo directamente conmigo.',
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
      projects: ['Plan Launch', 'Plan Business', 'Plan Growth', 'Otro / aún no lo sé'],
      message: 'Sobre el proyecto',
      messagePlaceholder: 'Qué hace la empresa, qué necesita y para cuándo.',
      footnote: 'Al enviar, WhatsApp se abre con tu mensaje listo.',
      send: 'Enviar por WhatsApp',
      waIntro: '¡Hola! Llegué por el sitio de MX Studio Web.',
      waProject: 'Proyecto',
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
