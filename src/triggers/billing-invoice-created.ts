import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'billing_invoice_created',
  noun: 'Billing',
  label: 'Tier Invoice Created',
  description: 'Triggers when a Subscriby tier invoice is raised for the creator.',
  event: 'billing.invoice_created',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'billing.invoice_created',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      creator_id: 'usr_01HXUSERSAMPLE0000000000000',
      invoice_id: 'in_1PabcdEFGHijkl',
      amount: '49.00',
      currency: 'USD',
      hosted_invoice_url: 'https://invoice.stripe.com/i/acct_1/test_abc',
      attempt_count: 0,
    },
  },
});
