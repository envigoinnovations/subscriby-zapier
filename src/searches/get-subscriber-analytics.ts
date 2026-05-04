import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_subscriber_analytics',
  noun: 'Subscriber Analytics',
  display: {
    label: 'Get Subscriber Analytics',
    description: 'Retrieve subscriber growth, churn, and cohort analytics for the team or a specific project.',
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
        url: `${apiBaseUrl()}/analytics/subscribers`,
        params,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      active_subscribers: 120,
      new_subscribers: 18,
      churned_subscribers: 4,
      churn_rate: 0.033,
    },
  },
} satisfies Search;
