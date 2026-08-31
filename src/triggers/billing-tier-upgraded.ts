import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_tier_upgraded',
  noun: 'Billing',
  label: 'Tier Upgraded',
  description:
    'Triggers when the creator upgrades their Subscriby tier (Free → Starter → Growth).',
  event: 'billing.tier_upgraded',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.tier_upgraded',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      creator_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      from_tier: '308eb3da-1eb6-11f0-b4f2-d8bbc173f8c3',
      to_tier: '882b72bb-1eb6-11f0-b4f2-d8bbc173f8c3',
      effective_at: '2026-05-18T10:05:00Z',
    },
  },
});
