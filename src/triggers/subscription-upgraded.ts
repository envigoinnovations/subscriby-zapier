import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_upgraded',
  noun: 'Subscription',
  label: 'Subscription Upgraded',
  description:
    'Triggers when a subscriber is switched to a higher-priced plan on the same project. Proration Amount is reserved and always empty.',
  event: 'subscription.upgraded',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.upgraded',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      from_plan_id: 'pln_01HXPLANBASIC00000000000000',
      to_plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      proration_amount: null,
    },
  },
});
