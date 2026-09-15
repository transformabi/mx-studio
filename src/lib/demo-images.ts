/**
 * Locally-hosted assets for the portfolio demos.
 * Files live under /public/estudio/*.
 */

export const heros = {
  'moda-arte': '/heros/moda-arte.webp',
  'restaurante-terra': '/heros/restaurante-terra.webp',
  'clinica-sereno': '/heros/clinica-sereno.webp',
  'motta-advogados': '/heros/motta-advogados.webp',
  'costa-imoveis': '/heros/costa-imoveis.webp',
  'rota-clara': '/heros/rota-clara.webp',
  'lumi-odonto': '/heros/lumi-odonto.webp',
  'iris-estetica': '/heros/iris-estetica.webp',
  'alicerce-construtora': '/heros/alicerce-construtora.webp',
} as const;

/** Search terms used by <ImgFallback> while a photo is still missing (see PROMPTS.md). */
export const demoKeywords: Record<keyof typeof heros, string> = {
  'moda-arte': 'fashion',
  'restaurante-terra': 'restaurant',
  'clinica-sereno': 'therapy',
  'motta-advogados': 'library',
  'costa-imoveis': 'interior',
  'rota-clara': 'workshop',
  'lumi-odonto': 'dentist',
  'iris-estetica': 'spa',
  'alicerce-construtora': 'construction',
};

// Moda Arte — 12 product photos (3:4)
export const modaArteProducts = {
  v1: '/moda-arte/products/v1.webp',
  v2: '/moda-arte/products/v2.webp',
  v3: '/moda-arte/products/v3.webp',
  b1: '/moda-arte/products/b1.webp',
  b2: '/moda-arte/products/b2.webp',
  b3: '/moda-arte/products/b3.webp',
  c1: '/moda-arte/products/c1.webp',
  c2: '/moda-arte/products/c2.webp',
  a1: '/moda-arte/products/a1.webp',
  a2: '/moda-arte/products/a2.webp',
  a3: '/moda-arte/products/a3.webp',
  a4: '/moda-arte/products/a4.webp',
} as const;

// Restaurante Terra — 5 dish photos by category (4:3)
export const restauranteDishes = {
  couvert: '/restaurante/dishes/couvert.webp',
  entrada: '/restaurante/dishes/entrada.webp',
  principal: '/restaurante/dishes/principal.webp',
  sobremesa: '/restaurante/dishes/sobremesa.webp',
  bebida: '/restaurante/dishes/bebida.webp',
} as const;

// Clínica Sereno — 3 professional portraits (1:1)
export const clinicaProfessionals = {
  p1: '/clinica/professionals/p1.webp',
  p2: '/clinica/professionals/p2.webp',
  p3: '/clinica/professionals/p3.webp',
} as const;

// Motta Advogados — 3 partner portraits (4:5)
export const mottaPartners = {
  p1: '/motta/partners/p1.webp',
  p2: '/motta/partners/p2.webp',
  p3: '/motta/partners/p3.webp',
} as const;

// Costa Imóveis — 10 property main photos (4:3)
export const imoveisProperties = {
  i1: '/imoveis/properties/i1.webp',
  i2: '/imoveis/properties/i2.webp',
  i3: '/imoveis/properties/i3.webp',
  i4: '/imoveis/properties/i4.webp',
  i5: '/imoveis/properties/i5.webp',
  i6: '/imoveis/properties/i6.webp',
  i7: '/imoveis/properties/i7.webp',
  i8: '/imoveis/properties/i8.webp',
  i9: '/imoveis/properties/i9.webp',
  i10: '/imoveis/properties/i10.webp',
} as const;

// Costa Imóveis — 8 shared gallery photos (16:9)
export const imoveisGallery = [
  '/imoveis/gallery/g1.webp',
  '/imoveis/gallery/g2.webp',
  '/imoveis/gallery/g3.webp',
  '/imoveis/gallery/g4.webp',
  '/imoveis/gallery/g5.webp',
  '/imoveis/gallery/g6.webp',
  '/imoveis/gallery/g7.webp',
  '/imoveis/gallery/g8.webp',
] as const;

// Rota Clara — creator + testimonials + student stack
export const rotaClara = {
  creator: '/rota-clara/creator.webp',
  testimonials: {
    t1: '/rota-clara/testimonials/t1.webp',
    t2: '/rota-clara/testimonials/t2.webp',
    t3: '/rota-clara/testimonials/t3.webp',
  },
  // Only s1 was provided — reuse testimonial photos for s2-s4 slots
  students: [
    '/rota-clara/students/s1.webp',
    '/rota-clara/testimonials/t1.webp',
    '/rota-clara/testimonials/t2.webp',
    '/rota-clara/testimonials/t3.webp',
  ],
} as const;

// Lumi Odontologia — clinic interior (4:3) + 3 dentist portraits (4:5)
export const lumiOdonto = {
  clinic: '/lumi-odonto/clinic.webp',
  team: {
    d1: '/lumi-odonto/team/d1.webp',
    d2: '/lumi-odonto/team/d2.webp',
    d3: '/lumi-odonto/team/d3.webp',
  },
} as const;

// Íris Estética — space (3:4) + 6 procedure photos (4:5)
export const irisEstetica = {
  space: '/iris-estetica/space.webp',
  procedures: {
    bioestimulador: '/iris-estetica/procedures/bioestimulador.webp',
    toxina: '/iris-estetica/procedures/toxina.webp',
    laser: '/iris-estetica/procedures/laser.webp',
    peeling: '/iris-estetica/procedures/peeling.webp',
    criolipolise: '/iris-estetica/procedures/criolipolise.webp',
    drenagem: '/iris-estetica/procedures/drenagem.webp',
  },
} as const;

// Alicerce Engenharia — 6 finished projects (4:3)
export const alicerceProjects = {
  o1: '/alicerce/projects/o1.webp',
  o2: '/alicerce/projects/o2.webp',
  o3: '/alicerce/projects/o3.webp',
  o4: '/alicerce/projects/o4.webp',
  o5: '/alicerce/projects/o5.webp',
  o6: '/alicerce/projects/o6.webp',
} as const;
