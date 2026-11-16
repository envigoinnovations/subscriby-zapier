import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_payments',
  noun: 'Payment',
  display: {
    label: 'Find Payments',
    description:
      'List the payment ledger the dashboard’s All Transactions page shows, newest first, across every project the token may see or one project. Narrow by status, plan, payment method, connector, a span of dates, or a search over the gateway references and the member, plan and project names. Amounts are as paid, in the payment’s currency; a refund is a row of its own.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: false,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
        helpText: 'Leave blank for every project the token may see.',
      },
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: {
          successful: 'Successful',
          failed: 'Failed',
          pending: 'Pending',
          refunded: 'Refunded',
        },
      },
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: false, helpText: 'UUID of a plan. Find it with Find Plan by Name.' },
      { key: 'method_id', label: 'Payment Method ID', type: 'string', required: false, helpText: 'UUID of a payment method. Find it with Get Payment Method.' },
      { key: 'connector', label: 'Connector', type: 'string', required: false, helpText: 'A connector key, such as telegram or discord: keeps to projects whose live installation is that connector.' },
      { key: 'from', label: 'From', type: 'datetime', required: false, helpText: 'Payments that occurred at or after this moment.' },
      { key: 'to', label: 'To', type: 'datetime', required: false, helpText: 'Payments that occurred at or before this moment.' },
      { key: 'search', label: 'Search', type: 'string', required: false, helpText: 'Matched against the gateway references, the subscription’s payment id, or a member, plan or project name, as the page’s search box does.' },
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Rows per page, 1–100. Leave blank for the server default of 25.',
      },
      { key: 'page', label: 'Page', type: 'integer', required: false, helpText: '1-indexed.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      for (const key of ['project_id', 'status', 'plan_id', 'method_id', 'connector', 'from', 'to', 'search'] as const) {
        const value = bundle.inputData[key];

        if (value !== undefined && value !== null && value !== '') {
          params[key] = value;
        }
      }

      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/payments`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '8b0c4a15-e792-4360-95d8-1f47c0b3e926',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      plan_id: '2c1e7a9d-4b3f-4e8a-9c21-7d5e0b6a8f31',
      plan_name: 'Monthly Pass',
      subscriber_id: '9a3b2c1d-6e5f-4a7b-8c9d-0e1f2a3b4c5d',
      subscriber_name: 'Ada Lovelace',
      method_id: 'a15d70c8-3e46-4b92-b70f-58c9d2140e63',
      provider: 'stripe',
      provider_label: 'Stripe',
      mode: 'live',
      status: 'successful',
      status_label: 'Successful',
      amount: '29.0000',
      currency: 'USD',
      calculated_fee: '0.8700',
      billing_reason: 'subscription_cycle',
      external_payment_id: 'pi_3QX1Y2Z3A4B5C6D7',
      external_event_id: 'evt_1QX1Y2Z3A4B5C6D7',
      failure_reason: null,
      occurred_at: '2026-11-15T10:05:00+00:00',
      created_at: '2026-11-15T10:05:04+00:00',
    },
  },
} satisfies Search;
