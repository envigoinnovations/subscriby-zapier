import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_reactivated',
  noun: 'Subscription',
  label: 'Subscription Reactivated',
  description: 'Triggers when a cancelled / expired subscription is reactivated.',
  event: 'subscription.reactivated',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.reactivated',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription: {
        id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        plan_id: 'pln_01HXPLANSAMPLE0000000000000',
        status: 'active',
      },
      subscriber: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        name: 'Jane Doe',
        email: 'jane@example.com',
      },
    },
  },
});
