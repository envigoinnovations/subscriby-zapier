import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_tier_downgraded',
  noun: 'Billing',
  label: 'Tier Downgraded',
  description: 'Triggers when the creator downgrades their Subscriby tier.',
  event: 'billing.tier_downgraded',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.tier_downgraded',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      creator_id: 'usr_01HXUSERSAMPLE0000000000000',
      from_tier: '882b72bb-1eb6-11f0-b4f2-d8bbc173f8c3',
      to_tier: '308eb3da-1eb6-11f0-b4f2-d8bbc173f8c3',
      effective_at: '2026-05-18T10:05:00Z',
    },
  },
});
