import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_invoice_overdue',
  noun: 'Billing',
  label: 'Tier Invoice Overdue',
  description: 'Triggers when a Subscriby tier invoice is overdue.',
  event: 'billing.invoice_overdue',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.invoice_overdue',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      invoice: {
        id: 'inv_01HXINVOICESAMPLE000000000',
        amount: '49.00',
        currency_id: 'USD',
        status: 'overdue',
      },
    },
  },
});
