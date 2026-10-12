import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_access_suspended',
  noun: 'Subscription',
  label: 'Subscription Access Suspended',
  description:
    'Triggers when the Revenue Recovery grace window closes on an unpaid renewal and the member is put outside every resource until a charge settles. The subscription is not ended: grace_days is the window the project ran, and the next successful payment restores the member and fires Subscription Access Restored.',
  event: 'subscription.access_suspended',
  sample: {
    id: 'evt_01HXEXAMPLERECOVERY0000002',
    type: 'subscription.access_suspended',
    created_at: '2026-10-19T10:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      payment_failed_at: '2026-10-12T10:00:00+00:00',
      grace_ends_at: '2026-10-19T10:00:00+00:00',
      suspended_at: '2026-10-19T10:00:00+00:00',
      grace_days: 7,
    },
  },
});
