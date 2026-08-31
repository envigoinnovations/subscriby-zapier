import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_transactions',
  noun: 'Transaction',
  display: {
    label: 'List Transactions',
    description: 'List transactions for a project, filterable by status, provider, plan, or currency. Returns a cursor-paginated page.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'period', label: 'Period', type: 'string', required: false },
      { key: 'from', label: 'From', type: 'datetime', required: false },
      { key: 'to', label: 'To', type: 'datetime', required: false },
      { key: 'statuses', label: 'Statuses', type: 'string', required: false, list: true },
      { key: 'provider_ids', label: 'Provider IDs', type: 'string', required: false, list: true },
      { key: 'plan_ids', label: 'Plan IDs', type: 'string', required: false, list: true },
      { key: 'currency_ids', label: 'Currency IDs', type: 'string', required: false, list: true },
      { key: 'cursor', label: 'Cursor', type: 'string', required: false, helpText: 'Opaque cursor returned in meta.next_cursor.' },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '50', helpText: 'Between 1 and 200.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {
        project_id: bundle.inputData.project_id,
      };

      const passthrough: Array<keyof typeof bundle.inputData> = [
        'period',
        'from',
        'to',
        'statuses',
        'provider_ids',
        'plan_ids',
        'currency_ids',
        'cursor',
        'limit',
      ];

      for (const key of passthrough) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          params[key as string] = value;
        }
      }

      if (params.limit === undefined) {
        params.limit = 50;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/analytics/transactions`,
        params,
      });

      handleHttpError(response, z);

      const envelope = response.data as { data?: Record<string, unknown>[] };

      return (envelope.data ?? []);
    },
    sample: {
      id: '8b0c4a15-e792-4360-95d8-1f47c0b3e926',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      amount: '29.00',
      currency_id: 'USD',
      status: 'succeeded',
    },
  },
} satisfies Search;
