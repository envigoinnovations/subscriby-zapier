import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'plan_sync_completed',
  noun: 'Plan',
  label: 'Plan Sync Completed',
  description:
    'Triggers when the background sync finishes reconciling a plan with its upstream payment provider (Stripe product / price, PayPal plan, etc.).',
  event: 'plan.sync_completed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'plan.sync_completed',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      providers: ['stripe', 'paypal'],
      synced_at: '2026-05-18T10:05:00Z',
    },
  },
});
