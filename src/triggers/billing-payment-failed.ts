import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_payment_failed',
  noun: 'Billing',
  label: 'Tier Payment Failed',
  description:
    "Triggers when a charge for the creator's MemberPass tier fails on the provider.",
  event: 'billing.payment_failed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.payment_failed',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      invoice: {
        id: 'inv_01HXINVOICESAMPLE000000000',
        amount: '49.00',
        currency_id: 'USD',
        status: 'failed',
      },
    },
  },
});
