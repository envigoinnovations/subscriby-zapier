import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_refunded',
  noun: 'Subscription',
  label: 'Subscription Refunded',
  description:
    'Triggers when a subscription-level refund settles. NOTE: Subscriby does not emit this event yet — Zaps built on it stay subscribed and validate, but will not fire until it ships.',
  event: 'subscription.refunded',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.refunded',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
    },
  },
});
