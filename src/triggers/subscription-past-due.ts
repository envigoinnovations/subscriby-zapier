import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_past_due',
  noun: 'Subscription',
  label: 'Subscription Past Due',
  description:
    'Triggers when a subscription enters the past-due state after a failed renewal — provider is retrying.',
  event: 'subscription.past_due',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.past_due',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription: {
        id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        plan_id: 'pln_01HXPLANSAMPLE0000000000000',
        status: 'past_due',
      },
      subscriber: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        name: 'Jane Doe',
        email: 'jane@example.com',
      },
    },
  },
});
