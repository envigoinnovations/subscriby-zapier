import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_unpaused',
  noun: 'Subscription',
  label: 'Subscription Unpaused',
  description: 'Triggers when a paused subscription resumes.',
  event: 'subscription.unpaused',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.unpaused',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      resumed_at: '2026-05-18T10:05:00Z',
    },
  },
});
