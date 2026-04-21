import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_activated',
  noun: 'Subscription',
  label: 'Subscription Activated',
  description:
    'Triggers when a subscription transitions to active after its first successful payment clears. Distinct from Subscription Created — fires once the provider confirms capture.',
  event: 'subscription.activated',
  sample: {
    id: 'evt_01HXEXAMPLE999999999999999',
    type: 'subscription.activated',
    created_at: '2026-05-18T10:06:00Z',
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
        telegram_user_id: '123456789',
      },
    },
  },
});
