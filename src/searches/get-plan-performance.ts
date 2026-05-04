import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_plan_performance',
  noun: 'Plan Performance Row',
  display: {
    label: 'Get Plan Performance',
    description: 'Retrieve per-plan performance metrics (subscribers, revenue, conversion) for a project.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'period', label: 'Period', type: 'string', required: false, default: '30d' },
      { key: 'from', label: 'From', type: 'datetime', required: false },
      { key: 'to', label: 'To', type: 'datetime', required: false },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {
        project_id: bundle.inputData.project_id,
      };

      if (bundle.inputData.period) params.period = bundle.inputData.period;
      if (bundle.inputData.from) params.from = bundle.inputData.from;
      if (bundle.inputData.to) params.to = bundle.inputData.to;

      const response = await z.request({
        url: `${apiBaseUrl()}/analytics/plan-performance`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      name: 'Premium Monthly',
      active_subscribers: 42,
      gross_revenue: '1218.00',
      currency_id: 'USD',
    },
  },
} satisfies Search;
