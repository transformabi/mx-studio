import { describe, expect, it } from 'vitest';
import { createCheckoutSession } from '../../worker/checkout';

const post = (plan: string, key?: string) => {
  const body = new FormData();
  body.set('plan', plan);
  return createCheckoutSession(new Request('https://mxstudioweb.com.br/api/create-checkout-session', { method: 'POST', body }), {
    STRIPE_SECRET_KEY: key,
  });
};

describe('checkout session', () => {
  it('only accepts POST', async () => {
    const res = await createCheckoutSession(new Request('https://mxstudioweb.com.br/api/create-checkout-session'), {});
    expect(res.status).toBe(405);
  });

  it('refuses an unknown plan before calling Stripe', async () => {
    const res = await post('landing', 'sk_test_x');
    expect(res.status).toBe(400);
  });

  it('stays down until the secret is set', async () => {
    const res = await post('essencial');
    expect(res.status).toBe(500);
  });
});
