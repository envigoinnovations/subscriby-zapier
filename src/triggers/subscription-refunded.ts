import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_refunded',
  noun: 'Subscription',
  label: 'Subscription Refunded',
  description:
    'Triggers when a settled refund returns the whole charge, so the subscription is unwound and access revoked. A partial refund raises Payment Refunded instead. Emitted for Stripe, PayPal, Paystack, Razorpay and Skrill; CoinPayments and CeyPay expose no refund notification.',
  event: 'subscription.refunded',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'subscription.refunded',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
    },
  },
});
