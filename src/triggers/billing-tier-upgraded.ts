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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      tier: {
        id: 'tier_growth',
        name: 'Growth',
      },
    },
  },
});
