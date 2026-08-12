import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_past_due',
  noun: 'Subscription',
  label: 'Subscription Past Due',
  description:
    'Triggers when a scheduled charge fails but the subscription is still inside its grace window. Emitted for Stripe and Razorpay only — use Payment Failed for reliable cross-provider coverage.',
  event: 'subscription.past_due',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.past_due',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      provider: 'stripe',
    },
  },
});
