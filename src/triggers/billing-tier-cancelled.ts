import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_tier_cancelled',
  noun: 'Billing',
  label: 'Tier Cancelled',
  description:
    'Triggers when the creator paid Subscriby tier is cancelled. Fires twice per cancellation — once when the creator cancels, and again when the provider deletes the subscription at period end — with a different field set each time.',
  event: 'billing.tier_cancelled',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.tier_cancelled',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      creator_id: 'usr_01HXUSERSAMPLE0000000000000',
      plan_id: '882b72bb-1eb6-11f0-b4f2-d8bbc173f8c3',
      effective_at: '2026-06-18T00:00:00Z',
    },
  },
});
