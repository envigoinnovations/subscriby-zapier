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
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: false, dynamic: 'dropdown_plans.id.name' },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '25' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.status) params.status = bundle.inputData.status;
      if (bundle.inputData.plan_id) params.plan_id = bundle.inputData.plan_id;
      params.per_page = Math.min(Number(bundle.inputData.limit ?? 25), 100);

      const response = await z.request({
        url: `${apiBaseUrl()}/subscriptions`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      status: 'active',
    },
  },
} satisfies Search;
