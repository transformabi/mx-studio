import { describe, expect, it } from 'vitest';
import { clientCases, demos, estudio, lcpSeconds, services, showcase, SITE_URL, vagasRestantes } from '@/lib/estudio';

describe('studio data', () => {
  it('uses the new domain and e-mail', () => {
    expect(SITE_URL).toBe('https://mxstudioweb.com.br');
    expect(estudio.email).toBe('contato@mxstudioweb.com.br');
  });

  it('shows Sulamita as the only real client', () => {
    expect(clientCases.map((c) => c.clientName)).toEqual(['Sulamita Nascimento']);
  });

  it('keeps the agreed starting prices', () => {
    expect(services).toEqual([
      { key: 'landing', price: 3500 },
      { key: 'institucional', price: 4900 },
      { key: 'ecommerce', price: 9900 },
      { key: 'sistema', price: 16000 },
    ]);
  });

  it('showcases only the six demos with real photography', () => {
    expect([...showcase].sort()).toEqual(
      ['clinica-sereno', 'costa-imoveis', 'moda-arte', 'motta-advogados', 'restaurante-terra', 'rota-clara'].sort(),
    );
    for (const slug of showcase) {
      expect(demos.some((d) => d.slug === slug)).toBe(true);
      expect(lcpSeconds[slug]).toBeGreaterThan(0);
    }
  });
});

describe('founder slots wording', () => {
  const text = (n: number) => {
    const v = vagasRestantes(n);
    return `${v.verb} ${v.count}. ${v.tail}`;
  };

  it('agrees in number with the slots left', () => {
    // At 0 the page shows the sold-out headline instead; the helper still never says "0 vaga".
    expect(vagasRestantes(0)).toMatchObject({ verb: 'Restam', count: '0 vagas' });
    expect(text(1)).toBe('Resta 1 vaga. Ela pode ser sua.');
    expect(text(2)).toBe('Restam 2 vagas. Uma pode ser sua.');
  });
});
