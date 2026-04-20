import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_expired',
  noun: 'Subscription',
  label: 'Subscription Expired',
  description:
    'Triggers when a subscription reaches its end date without renewal — including post-cancellation final expiry.',
  event: 'subscription.expired',
  sample: {
    id: 'evt_01HXEXAMPLE222222222222222',
    type: 'subscription.expired',
    created_at: '2026-05-18T10:15:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription: {
        id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        plan_id: 'pln_01HXPLANSAMPLE0000000000000',
        status: 'expired',
      },
    },
  },
});
