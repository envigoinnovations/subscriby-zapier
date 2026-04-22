import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_invoice_created',
  noun: 'Billing',
  label: 'Tier Invoice Created',
  description: 'Triggers when a MemberPass tier invoice is raised for the creator.',
  event: 'billing.invoice_created',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.invoice_created',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      invoice: {
        id: 'inv_01HXINVOICESAMPLE000000000',
        amount: '49.00',
        currency_id: 'USD',
        status: 'open',
      },
    },
  },
});
