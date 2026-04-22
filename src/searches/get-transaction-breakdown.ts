import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_transaction_breakdown',
  noun: 'Transaction Breakdown',
  display: {
    label: 'Get Transaction Breakdown',
    description: 'Retrieve a transaction breakdown grouped by plan, payment provider, currency, or project.',
  },
  operation: {
    inputFields: [
      {
        key: 'dimension',
        label: 'Dimension',
        type: 'string',
        required: true,
        choices: {
          plan: 'Plan',
          payment_provider: 'Payment Provider',
          currency: 'Currency',
          project: 'Project',
        },
      },
      { key: 'project_id', label: 'Project ID', type: 'string', required: false },
      { key: 'period', label: 'Period', type: 'string', required: false },
      { key: 'from', label: 'From', type: 'datetime', required: false },
      { key: 'to', label: 'To', type: 'datetime', required: false },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {
        dimension: bundle.inputData.dimension,
      };

      if (bundle.inputData.project_id) params.project_id = bundle.inputData.project_id;
      if (bundle.inputData.period) params.period = bundle.inputData.period;
      if (bundle.inputData.from) params.from = bundle.inputData.from;
      if (bundle.inputData.to) params.to = bundle.inputData.to;

      const response = await z.request({
        url: `${apiBaseUrl()}/analytics/transactions/breakdown`,
        params,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      dimension: 'plan',
      rows: [],
    },
  },
} satisfies Search;
