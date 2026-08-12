import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'payment_succeeded',
  noun: 'Payment',
  label: 'Payment Succeeded',
  description:
    'Triggers when a subscription charge or one-off payment is captured successfully through any configured provider.',
  event: 'payment.succeeded',
  sample: {
    id: 'evt_01HXEXAMPLE333333333333333',
    type: 'payment.succeeded',
    created_at: '2026-05-18T10:20:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      external_payment_id: 'pi_3PabcdEFGHijkl',
      provider: 'stripe',
      amount: '9.99',
      currency: 'USD',
      billing_reason: 'subscription_create',
    },
  },
});
