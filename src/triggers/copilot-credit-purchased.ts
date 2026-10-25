import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'copilot_credit_purchased',
  noun: 'Copilot Credit',
  label: 'Copilot Credit Purchased',
  description:
    'Triggers when a pack of Copilot Credits is paid for and credited, at Checkout or by the auto top-up: "paid_cents" is what you paid before tax, "bonus_cents" the free credit granted beside it, and "balance_cents" the whole balance after the purchase. Every amount is an integer in US cents; one event per pack, however many Stripe events describe the payment.',
  event: 'copilot_credit.purchased',
  sample: {
    id: 'evt_01HXEXAMPLECOPILOT0000001',
    type: 'copilot_credit.purchased',
    created_at: '2026-11-02T09:14:31Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      purchase_id: '0b1f7a2e-3c4d-4e5f-8a9b-1c2d3e4f5a6b',
      pack: 'regular',
      paid_cents: 2500,
      bonus_cents: 250,
      currency: 'USD',
      balance_cents: 3250,
    },
  },
});
