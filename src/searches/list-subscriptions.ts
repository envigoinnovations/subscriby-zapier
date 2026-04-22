import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_subscriptions',
  noun: 'Subscription',
  display: {
    label: 'List Subscriptions',
    description: 'List subscriptions, optionally filtered by status or plan.',
  },
  operation: {
    inputFields: [
      { key: 'status', label: 'Status', type: 'string', required: false, helpText: 'Optional status filter (e.g. active, trialing, past_due, cancelled).' },
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: false },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '25' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.status) params.status = bundle.inputData.status;
      if (bundle.inputData.plan_id) params.plan_id = bundle.inputData.plan_id;
      params.limit = bundle.inputData.limit ?? 25;

      const response = await z.request({
        url: `${apiBaseUrl()}/subscriptions`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      status: 'active',
    },
  },
} satisfies Search;
