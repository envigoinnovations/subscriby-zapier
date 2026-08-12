import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'new_subscription',
  noun: 'Subscription',
  label: 'New Subscription',
  description:
    'Triggers when a subscription is created WITHOUT a payment — an access-code redemption or a cardless trial start. Paid checkouts do NOT fire this; use Subscription Activated for those, or turn on both and de-duplicate on Subscription ID.',
  event: 'subscription.created',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.created',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      access_code: 'SLATE-SUNDAY-4F2A9',
    },
  },
});
