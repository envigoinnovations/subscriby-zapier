import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_subscription_by_id',
  noun: 'Subscription',
  display: {
    label: 'Find Subscription by ID',
    description: 'Look up a subscription by its UUID. Useful for follow-up steps after a subscription webhook fires.',
  },
  operation: {
    inputFields: [
      { key: 'subscription_id', label: 'Subscription ID', type: 'string', required: true, dynamic: 'dropdown_subscriptions.id.id' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const subscriptionId = bundle.inputData.subscription_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/subscriptions/${subscriptionId}`,
      });

      if (response.status === 404) {
        return [];
      }

      handleHttpError(response, z);

      const row = (response.data as { data?: unknown }).data ?? response.data;

      return row ? [row] : [];
    },
    sample: {
      id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      status: 'active',
    },
  },
} satisfies Search;