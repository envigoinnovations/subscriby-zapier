import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'payment_refunded',
  noun: 'Payment',
  label: 'Payment Refunded',
  description:
    'Triggers when a settled refund is recorded against a charge, full or partial — read data.full_refund to tell them apart. Only settled refunds fire; a refund a provider has merely queued raises nothing. Emitted for Stripe, PayPal, Paystack, Razorpay and Skrill.',
  event: 'payment.refunded',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'payment.refunded',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
    },
  },
});
