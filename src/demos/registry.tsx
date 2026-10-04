import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { DemoSlug } from '@/lib/estudio';

/** One lazily loaded chunk per demo, so each page ships only the demo it shows. */
export const demoComponents: Record<DemoSlug, ComponentType> = {
  'moda-arte': dynamic(() => import('./moda-arte/demo')),
  'restaurante-terra': dynamic(() => import('./restaurante-terra/demo')),
  'clinica-sereno': dynamic(() => import('./clinica-sereno/demo')),
  'motta-advogados': dynamic(() => import('./motta-advogados/demo')),
  'costa-imoveis': dynamic(() => import('./costa-imoveis/demo')),
  'rota-clara': dynamic(() => import('./rota-clara/demo')),
  'lumi-odonto': dynamic(() => import('./lumi-odonto/demo')),
  'iris-estetica': dynamic(() => import('./iris-estetica/demo')),
  'alicerce-construtora': dynamic(() => import('./alicerce-construtora/demo')),
  'mare-salao': dynamic(() => import('./mare-salao/demo')),
};
