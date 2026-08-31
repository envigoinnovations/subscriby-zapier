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
    project_id: null,
    data: {
      creator_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      invoice_id: 'in_1PabcdEFGHijkl',
      amount: '49.00',
      currency: 'USD',
      hosted_invoice_url: 'https://invoice.stripe.com/i/acct_1/test_abc',
      attempt_count: 4,
    },
  },
});
