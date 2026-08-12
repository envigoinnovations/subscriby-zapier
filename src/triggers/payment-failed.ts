import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'payment_failed',
  noun: 'Payment',
  label: 'Payment Failed',
  description:
    'Triggers when a subscription renewal or one-off payment fails at the provider (card declined, insufficient funds, crypto reorg, etc.).',
  event: 'payment.failed',
  sample: {
    id: 'evt_01HXEXAMPLE444444444444444',
    type: 'payment.failed',
    created_at: '2026-05-18T10:25:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      reason: 'card_declined',
      provider: 'stripe',
      external_payment_id: 'pi_3PabcdEFGHijkl',
    },
  },
});
