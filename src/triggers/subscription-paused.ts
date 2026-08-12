import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_paused',
  noun: 'Subscription',
  label: 'Subscription Paused',
  description:
    'Triggers when a subscription is paused (billing suspended, access retained or gated depending on plan).',
  event: 'subscription.paused',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.paused',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      paused_at: '2026-05-18T10:05:00Z',
    },
  },
});
