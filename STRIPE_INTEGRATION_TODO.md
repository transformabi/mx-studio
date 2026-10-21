# Stripe Checkout

Hosted Checkout (the customer leaves the site and pays on Stripe). The three plans are subscriptions.

## Values to Replace

The prices, return URLs and mode are already the live ones. Nothing in the checkout call is a `price_...` placeholder.

**Files containing the checkout call:**

- [worker/checkout.ts](worker/checkout.ts)

| Field | Current value | What to set |
| --- | --- | --- |
| mode | subscription | Already set. The three plans bill every month. |
| success_url | https://mxstudioweb.com.br/?assinatura=ok&session_id={CHECKOUT_SESSION_ID} | Already the live site. Change only if the domain changes. |
| cancel_url | https://mxstudioweb.com.br/#planos | Already the plans section. |
| line_items price Essencial | price_1USnEcJW2tXeRM9TBmuhgcXi | R$ 297/mês. Already the live price. |
| line_items price Profissional | price_1USnFKJW2tXeRM9TFkYPEFg4 | R$ 447/mês. Already the live price. |
| line_items price Completo | price_1USnJqJW2tXeRM9TcSoNPhqw | R$ 597/mês. Already the live price. |
| STRIPE_SECRET_KEY | not set on the Worker | Secret key from [API keys](https://dashboard.stripe.com/apikeys). Run `npx wrangler secret put STRIPE_SECRET_KEY`. |

## Configured Parameters

These came from Checkout Studio and are set on the session.

**Files containing these parameters:**

- [worker/checkout.ts](worker/checkout.ts)

| Parameter | Value |
| --- | --- |
| ui_mode | hosted_page |
| billing_address_collection | auto |
| phone_number_collection | enabled: false |
| automatic_tax | enabled: false |
| allow_promotion_codes | false |
| payment_method_collection | always |
| submit_type | auto |
| integration_identifier | hosted_web_0001 |
| origin_context | web |

Stripe SDK `stripe@23` uses `hosted_page`. Older SDKs (below 21) would use `hosted`.

## Setup and next steps

1. Put the live secret key on the Worker: `npx wrangler secret put STRIPE_SECRET_KEY`. The name matches [worker/checkout.ts](worker/checkout.ts). Do not use a `NEXT_PUBLIC_` or `VITE_` prefix. A local copy of the name is in [.env.example](.env.example). `.env` is gitignored.
2. Each **Quero este plano** button posts to `/api/create-checkout-session` with `plan` = `essencial`, `profissional` or `completo`.
3. The Worker creates a Checkout Session and redirects to the Stripe-hosted page. Coming back lands on the site. Cancelling returns to `#planos`.
4. Test with [card 4242 4242 4242 4242](https://docs.stripe.com/testing) only in test mode. These prices are live, so a real card is charged.
5. Fulfillment is still manual: Stripe does not email you by itself. Add a webhook for `checkout.session.completed` when you want an automatic notice. Support: https://support.stripe.com and https://docs.stripe.com/mcp.
