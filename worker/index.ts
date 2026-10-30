interface Env {
  ASSETS: { fetch: typeof fetch };
}

/** Static site from out/. The old Stripe checkout route (/api/create-checkout-session) was retired with the BRL plans. */
const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};

export default worker;
