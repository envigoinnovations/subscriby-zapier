import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_payment_recovered',
  noun: 'Subscription',
  label: 'Subscription Payment Recovered',
  description:
    'Triggers when a renewal that had failed is paid after all, closing the Revenue Recovery grace window. access_restored is true when the member had been paused for non-payment and was let back in with fresh invite links; payment_id names the settled charge when the gateway reported one.',
  event: 'subscription.payment_recovered',
  sample: {
    id: 'evt_01HXEXAMPLERECOVERY0000001',
    type: 'subscription.payment_recovered',
    created_at: '2026-10-14T10:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      provider: 'stripe',
      payment_id: '9d4b7a21-5e60-4f8c-a3b2-7c1e0d6f2a94',
      recovered_at: '2026-10-14T10:00:00+00:00',
      access_restored: true,
    },
  },
});
