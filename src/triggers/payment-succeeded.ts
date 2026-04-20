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
      payment: {
        id: 'pay_01HXPAYMENTSAMPLE000000000',
        subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        amount: '9.99',
        currency: 'USD',
        provider: 'stripe',
      },
    },
  },
});
