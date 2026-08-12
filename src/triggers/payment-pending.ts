import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'payment_pending',
  noun: 'Payment',
  label: 'Payment Pending',
  description:
    'Triggers when a payment is initiated but has not yet cleared (bank transfer, crypto in mempool, hosted checkout). Correlation fields vary by provider: Stripe sends Session ID, most others send Order ID, and PayPal sends neither.',
  event: 'payment.pending',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'payment.pending',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      provider: 'stripe',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      session_id: 'cs_test_a1B2c3D4e5',
    },
  },
});
