import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_unpaid',
  noun: 'Subscription',
  label: 'Subscription Unpaid',
  description:
    'Triggers when a subscription grace period ends without successful collection. Emitted for Stripe only; on other providers an abandoned subscription surfaces as Subscription Expired instead.',
  event: 'subscription.unpaid',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.unpaid',
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
