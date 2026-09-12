import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_revenue_composition',
  noun: 'Revenue Composition',
  display: {
    label: 'Get Revenue Composition',
    description:
      'Retrieve how revenue and payments are composed for the team or a specific project: transaction fees by payment provider, settled transactions by plan kind, gross revenue by currency, payment attempts by outcome, and the monthly recurring revenue split by plan. Each dataset carries its total, unit and slices with shares.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: false, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'period', label: 'Period', type: 'string', required: false },
      { key: 'from', label: 'From', type: 'datetime', required: false },
      { key: 'to', label: 'To', type: 'datetime', required: false },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.project_id) params.project_id = bundle.inputData.project_id;
      if (bundle.inputData.period) params.period = bundle.inputData.period;
      if (bundle.inputData.from) params.from = bundle.inputData.from;
      if (bundle.inputData.to) params.to = bundle.inputData.to;

      const response = await z.request({
        url: `${apiBaseUrl()}/analytics/composition`,
        params,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      range: { from: '2026-08-13', to: '2026-09-12' },
      fees_by_provider: {
        total: 84.1,
        unit: 'usd',
        slices: [{ key: 'stripe', label: 'Stripe', value: 61.4, share_percent: 73.01, color: 'blue' }],
      },
      transactions_by_kind: {
        total: 58,
        unit: 'count',
        slices: [{ key: 'subscription', label: 'Subscription', value: 41, share_percent: 70.69, color: 'blue' }],
      },
      revenue_by_currency: {
        total: 1682.0,
        unit: 'usd',
        slices: [{ key: 'USD', label: 'USD', value: 1490.0, share_percent: 88.59, color: 'blue' }],
      },
      payment_outcomes: {
        total: 63,
        unit: 'count',
        slices: [{ key: 'succeeded', label: 'Succeeded', value: 58, share_percent: 92.06, color: 'emerald' }],
      },
      mrr_by_plan: {
        total: 4120.0,
        unit: 'usd',
        slices: [{ key: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13', label: 'Gold', value: 2980.0, share_percent: 72.33, color: 'blue' }],
      },
    },
  },
} satisfies Search;
