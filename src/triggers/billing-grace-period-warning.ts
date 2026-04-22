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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      grace_period_ends_at: '2026-06-18T10:05:00Z',
    },
  },
});
