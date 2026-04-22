import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_earnings_report',
  noun: 'Earnings Report',
  display: {
    label: 'Get Earnings Report',
    description: 'Retrieve the earnings (net revenue) time series for the current team or a specific project.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: false },
      { key: 'period', label: 'Period', type: 'string', required: false },
      { key: 'from', label: 'From', type: 'datetime', required: false },
      { key: 'to', label: 'To', type: 'datetime', required: false },
      {
        key: 'granularity',
        label: 'Granularity',
        type: 'string',
        required: false,
        default: 'day',
        choices: { day: 'Day', week: 'Week', month: 'Month' },
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.project_id) params.project_id = bundle.inputData.project_id;
      if (bundle.inputData.period) params.period = bundle.inputData.period;
      if (bundle.inputData.from) params.from = bundle.inputData.from;
      if (bundle.inputData.to) params.to = bundle.inputData.to;
      if (bundle.inputData.granularity) params.granularity = bundle.inputData.granularity;

      const response = await z.request({
        url: `${apiBaseUrl()}/analytics/earnings`,
        params,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      total: '1240.00',
      currency_id: 'USD',
      granularity: 'day',
      points: [],
    },
  },
} satisfies Search;
