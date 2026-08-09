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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      tier: {
        id: 'tier_starter',
        name: 'Starter',
      },
    },
  },
});
