import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_renewed',
  noun: 'Subscription',
  label: 'Subscription Renewed',
  description:
    'Triggers when a recurring subscription successfully renews and the next cycle charge is captured. Use for billing-rollup, CRM-lifetime-value, and retention-signal workflows.',
  event: 'subscription.renewed',
  sample: {
    id: 'evt_01HXEXAMPLE888888888888888',
    type: 'subscription.renewed',
    created_at: '2026-05-18T10:45:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      provider: 'stripe',
      amount: '9.99',
      currency: 'USD',
    },
  },
});
