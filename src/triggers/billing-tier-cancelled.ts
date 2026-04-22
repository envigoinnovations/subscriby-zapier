import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_tier_cancelled',
  noun: 'Billing',
  label: 'Tier Cancelled',
  description: 'Triggers when the creator cancels their paid MemberPass tier.',
  event: 'billing.tier_cancelled',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.tier_cancelled',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      tier: {
        id: 'tier_free',
        name: 'Free',
      },
    },
  },
});
