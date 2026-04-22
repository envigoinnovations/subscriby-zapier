import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_unpaid',
  noun: 'Subscription',
  label: 'Subscription Unpaid',
  description:
    'Triggers when provider retries are exhausted and the subscription flips to unpaid — access about to be removed.',
  event: 'subscription.unpaid',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.unpaid',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription: {
        id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        plan_id: 'pln_01HXPLANSAMPLE0000000000000',
        status: 'unpaid',
      },
      subscriber: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        name: 'Jane Doe',
        email: 'jane@example.com',
      },
    },
  },
});
