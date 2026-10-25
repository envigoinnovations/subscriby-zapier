import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'copilot_credit_refunded',
  noun: 'Copilot Credit',
  label: 'Copilot Credit Refunded',
  description:
    'Triggers when Stripe refunds the charge for a pack of Copilot Credits, in part or in full, and the credit is taken back: "refunded_cents" is everything refunded on the purchase so far, "bonus_voided_cents" the bonus withdrawn once the refund reaches the full price, and "balance_cents" the whole balance after it, negative when the refunded credit had already been spent. One event per refund, with the running figure.',
  event: 'copilot_credit.refunded',
  sample: {
    id: 'evt_01HXEXAMPLECOPILOT0000004',
    type: 'copilot_credit.refunded',
    created_at: '2026-11-05T16:02:10Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      purchase_id: '0b1f7a2e-3c4d-4e5f-8a9b-1c2d3e4f5a6b',
      pack: 'regular',
      refunded_cents: 2500,
      bonus_voided_cents: 250,
      balance_cents: -180,
    },
  },
});
