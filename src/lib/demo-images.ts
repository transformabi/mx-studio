/**
 * Locally-hosted assets for the portfolio demos.
 * Files live under /public/estudio/*.
 */

export const heros = {
  'moda-arte': '/heros/moda-arte.png',
  'restaurante-terra': '/heros/restaurante-terra.png',
  'clinica-sereno': '/heros/clinica-sereno.png',
  'motta-advogados': '/heros/motta-advogados.png',
  'costa-imoveis': '/heros/costa-imoveis.png',
  'rota-clara': '/heros/rota-clara.png',
} as const;

// Moda Arte — 12 product photos (3:4)
export const modaArteProducts = {
  v1: '/moda-arte/products/v1.jpeg',
  v2: '/moda-arte/products/v2.jpeg',
  v3: '/moda-arte/products/v3.jpeg',
  b1: '/moda-arte/products/b1.jpeg',
  b2: '/moda-arte/products/b2.jpeg',
  b3: '/moda-arte/products/b3.jpeg',
  c1: '/moda-arte/products/c1.jpeg',
  c2: '/moda-arte/products/c2.jpeg',
  a1: '/moda-arte/products/a1.jpeg',
  a2: '/moda-arte/products/a2.jpeg',
  a3: '/moda-arte/products/a3.jpeg',
  a4: '/moda-arte/products/a4.jpeg',
} as const;

// Restaurante Terra — 5 dish photos by category (4:3)
export const restauranteDishes = {
  couvert: '/restaurante/dishes/couvert.jpeg',
  entrada: '/restaurante/dishes/entrada.jpeg',
  principal: '/restaurante/dishes/principal.jpeg',
  sobremesa: '/restaurante/dishes/sobremesa.jpeg',
  bebida: '/restaurante/dishes/bebida.jpeg',
} as const;

// Clínica Sereno — 3 professional portraits (1:1)
export const clinicaProfessionals = {
  p1: '/clinica/professionals/p1.jpeg',
  p2: '/clinica/professionals/p2.jpeg',
  p3: '/clinica/professionals/p3.jpeg',
} as const;

// Motta Advogados — 3 partner portraits (4:5)
export const mottaPartners = {
  p1: '/motta/partners/p1.jpeg',
  p2: '/motta/partners/p2.jpeg',
  p3: '/motta/partners/p3.jpeg',
} as const;

// Costa Imóveis — 10 property main photos (4:3)
export const imoveisProperties = {
  i1: '/imoveis/properties/i1.jpeg',
  i2: '/imoveis/properties/i2.jpeg',
  i3: '/imoveis/properties/i3.jpeg',
  i4: '/imoveis/properties/i4.jpeg',
  i5: '/imoveis/properties/i5.jpeg',
  i6: '/imoveis/properties/i6.jpeg',
  i7: '/imoveis/properties/i7.jpeg',
  i8: '/imoveis/properties/i8.jpeg',
  i9: '/imoveis/properties/i9.jpeg',
  i10: '/imoveis/properties/i10.jpeg',
} as const;

// Costa Imóveis — 8 shared gallery photos (16:9)
export const imoveisGallery = [
  '/imoveis/gallery/g1.jpeg',
  '/imoveis/gallery/g2.jpeg',
  '/imoveis/gallery/g3.jpeg',
  '/imoveis/gallery/g4.jpeg',
  '/imoveis/gallery/g5.jpeg',
  '/imoveis/gallery/g6.jpeg',
  '/imoveis/gallery/g7.jpeg',
  '/imoveis/gallery/g8.jpeg',
] as const;

// Rota Clara — creator + testimonials + student stack
export const rotaClara = {
  creator: '/rota-clara/creator.jpeg',
  testimonials: {
    t1: '/rota-clara/testimonials/t1.jpeg',
    t2: '/rota-clara/testimonials/t2.jpeg',
    t3: '/rota-clara/testimonials/t3.jpeg',
  },
  // Only s1 was provided — reuse testimonial photos for s2-s4 slots
  students: [
    '/rota-clara/students/s1.jpeg',
    '/rota-clara/testimonials/t1.jpeg',
    '/rota-clara/testimonials/t2.jpeg',
    '/rota-clara/testimonials/t3.jpeg',
  ],
} as const;
