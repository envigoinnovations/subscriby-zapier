import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_account_locked',
  noun: 'Billing',
  label: 'Tier Account Locked',
  description:
    "Triggers when the creator's account is locked out of paid features after an exhausted grace period.",
  event: 'billing.account_locked',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.account_locked',
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
