import Stripe from 'stripe';

/** Live prices on acct mxstudioweb.com.br. The secret key stays in the Worker, never in the page. */
const PRICES = {
  essencial: 'price_1USnEcJW2tXeRM9TBmuhgcXi',
  profissional: 'price_1USnFKJW2tXeRM9TFkYPEFg4',
  completo: 'price_1USnJqJW2tXeRM9TcSoNPhqw',
} as const;

type PlanId = keyof typeof PRICES;

const SITE = 'https://mxstudioweb.com.br';

export interface CheckoutEnv {
  STRIPE_SECRET_KEY?: string;
}

const isPlan = (value: string): value is PlanId => value in PRICES;

export async function createCheckoutSession(request: Request, env: CheckoutEnv): Promise<Response> {
  if (request.method !== 'POST') return new Response('Use POST.', { status: 405 });
  if (!env.STRIPE_SECRET_KEY) return new Response('Checkout ainda não configurado.', { status: 500 });

  const form = await request.formData();
  const plan = String(form.get('plan') ?? '');
  if (!isPlan(plan)) return new Response('Plano inválido.', { status: 400 });

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'hosted_page',
    mode: 'subscription',
    billing_address_collection: 'auto',
    phone_number_collection: { enabled: false },
    automatic_tax: { enabled: false },
    allow_promotion_codes: false,
    payment_method_collection: 'always',
    submit_type: 'auto',
    integration_identifier: 'hosted_web_0001',
    origin_context: 'web',
    success_url: `${SITE}/?assinatura=ok&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE}/#planos`,
    line_items: [{ price: PRICES[plan], quantity: 1 }],
  });

  if (!session.url) return new Response('A Stripe não devolveu o checkout.', { status: 502 });
  return Response.redirect(session.url, 303);
}
