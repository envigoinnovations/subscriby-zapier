import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_dashboard_metrics',
  noun: 'Dashboard Metric',
  display: {
    label: 'Get Dashboard Metrics',
    description: 'Retrieve the dashboard metric cards for the current team or a specific project.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: false },
      { key: 'period', label: 'Period', type: 'string', required: false, default: '30d' },
      { key: 'compare_period', label: 'Compare Period', type: 'string', required: false, default: 'previous' },
      { key: 'from', label: 'From', type: 'datetime', required: false, helpText: 'ISO date.' },
      { key: 'to', label: 'To', type: 'datetime', required: false, helpText: 'ISO date.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.project_id) params.project_id = bundle.inputData.project_id;
      if (bundle.inputData.period) params.period = bundle.inputData.period;
      if (bundle.inputData.compare_period) params.compare_period = bundle.inputData.compare_period;
      if (bundle.inputData.from) params.from = bundle.inputData.from;
      if (bundle.inputData.to) params.to = bundle.inputData.to;

      const response = await z.request({
        url: `${apiBaseUrl()}/analytics/dashboard`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      key: 'mrr',
      label: 'Monthly Recurring Revenue',
      value: '1240.00',
      currency_id: 'USD',
    },
  },
} satisfies Search;
