import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_trial_expired',
  noun: 'Subscription',
  label: 'Subscription Trial Expired',
  description:
    "Triggers when a subscriber's trial window ends without converting.",
  event: 'subscription.trial_expired',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.trial_expired',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      ends_at: '2026-05-25T10:05:00Z',
      trial_ends_at: '2026-05-25T10:05:00Z',
    },
  },
});
