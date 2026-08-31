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
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      provider: 'stripe',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      session_id: 'cs_test_a1B2c3D4e5',
    },
  },
});
