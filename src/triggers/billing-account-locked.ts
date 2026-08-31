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
    project_id: null,
    data: {
      creator_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      past_due_since: '2026-03-19T10:05:00Z',
      locked_at: '2026-05-18T10:05:00Z',
    },
  },
});
