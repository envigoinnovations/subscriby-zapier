import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'payment_pending',
  noun: 'Payment',
  label: 'Payment Pending',
  description:
    'Triggers when a payment is initiated but has not yet cleared (e.g. bank transfer, crypto in mempool).',
  event: 'payment.pending',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'payment.pending',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      payment: {
        id: 'pay_01HXPAYMENTSAMPLE0000000000',
        subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        amount: '29.00',
        currency_id: 'USD',
        status: 'pending',
      },
    },
  },
});
