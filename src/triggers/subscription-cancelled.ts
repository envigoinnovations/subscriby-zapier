import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_cancelled',
  noun: 'Subscription',
  label: 'Subscription Cancelled',
  description:
    'Triggers when a subscription is cancelled — either by the subscriber from the portal or by the creator from the dashboard.',
  event: 'subscription.cancelled',
  sample: {
    id: 'evt_01HXEXAMPLE111111111111111',
    type: 'subscription.cancelled',
    created_at: '2026-05-18T10:10:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription: {
        id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        plan_id: 'pln_01HXPLANSAMPLE0000000000000',
        status: 'canceled',
      },
      reason: 'user_initiated',
    },
  },
});
