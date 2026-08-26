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
      creator_id: 'usr_01HXUSERSAMPLE0000000000000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscription_id: 'sub_01HXSUBSAMPLE00000000000000',
      trial_ends_at: '2026-05-18T10:05:00Z',
      hours_remaining: 72,
      amount: '19.00',
      currency: 'USD',
      amount_estimated: false,
    },
  },
});
