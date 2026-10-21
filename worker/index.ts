import { createCheckoutSession, type CheckoutEnv } from './checkout';

interface Env extends CheckoutEnv {
  ASSETS: { fetch: typeof fetch };
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/create-checkout-session') return createCheckoutSession(request, env);
    return env.ASSETS.fetch(request);
  },
};

export default worker;
