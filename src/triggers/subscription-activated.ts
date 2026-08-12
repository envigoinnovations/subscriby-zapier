import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_activated',
  noun: 'Subscription',
  label: 'Subscription Activated',
  description:
    'Triggers when a paid subscription is acquired, on the first successful payment through any provider. This is the event to use for paying customers — it fires once per subscription and covers both recurring plans and one-time passes.',
  event: 'subscription.activated',
  sample: {
    id: 'evt_01HXEXAMPLE999999999999999',
    type: 'subscription.activated',
    created_at: '2026-05-18T10:06:00Z',
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
