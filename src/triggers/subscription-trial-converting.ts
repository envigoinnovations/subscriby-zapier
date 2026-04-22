import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_trial_converting',
  noun: 'Subscription',
  label: 'Subscription Trial Converting',
  description:
    'Triggers when a trial is about to convert into a paid subscription (reminder window).',
  event: 'subscription.trial_converting',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.trial_converting',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription: {
        id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        plan_id: 'pln_01HXPLANSAMPLE0000000000000',
        status: 'trialing',
      },
      subscriber: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        name: 'Jane Doe',
        email: 'jane@example.com',
      },
    },
  },
});
