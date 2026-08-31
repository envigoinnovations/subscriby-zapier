import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'payment_failed',
  noun: 'Payment',
  label: 'Payment Failed',
  description:
    'Triggers when a subscription renewal or one-off payment fails at the provider (card declined, insufficient funds, crypto reorg, etc.).',
  event: 'payment.failed',
  sample: {
    id: 'evt_01HXEXAMPLE444444444444444',
    type: 'payment.failed',
    created_at: '2026-05-18T10:25:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      reason: 'card_declined',
      provider: 'stripe',
      external_payment_id: 'pi_3PabcdEFGHijkl',
    },
  },
});
