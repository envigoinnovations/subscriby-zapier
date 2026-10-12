import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_access_restored',
  noun: 'Subscription',
  label: 'Subscription Access Restored',
  description:
    'Triggers when a member whose access was paused for non-payment is let back in because their renewal was paid after all. Their invite links are reissued and they are welcomed back; Subscription Payment Recovered fires beside it with the charge.',
  event: 'subscription.access_restored',
  sample: {
    id: 'evt_01HXEXAMPLERECOVERY0000003',
    type: 'subscription.access_restored',
    created_at: '2026-10-21T08:15:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      suspended_at: '2026-10-19T10:00:00+00:00',
      restored_at: '2026-10-21T08:15:00+00:00',
    },
  },
});
