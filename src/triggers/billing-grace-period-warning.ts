import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_grace_period_warning',
  noun: 'Billing',
  label: 'Tier Grace Period Warning',
  description:
    "Triggers when the creator's account enters a grace period after a failed tier payment.",
  event: 'billing.grace_period_warning',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.grace_period_warning',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      creator_id: 'usr_01HXUSERSAMPLE0000000000000',
      past_due_since: '2026-03-26T10:05:00Z',
      days_until_lockdown: 7,
    },
  },
});
