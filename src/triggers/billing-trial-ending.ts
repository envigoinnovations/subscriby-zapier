import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_trial_ending',
  noun: 'Billing',
  label: 'Tier Trial Ending',
  description:
    "Triggers when the creator's own Subscriby trial is about to convert and take its first payment. Fires once per reminder milestone (72h then 24h by default), so de-duplicate on hours_remaining if you only want to act once.",
  event: 'billing.trial_ending',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.trial_ending',
    created_at: '2026-05-15T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      creator_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      trial_ends_at: '2026-05-18T10:05:00Z',
      hours_remaining: 72,
      amount: '19.00',
      currency: 'USD',
      amount_estimated: false,
    },
  },
});
