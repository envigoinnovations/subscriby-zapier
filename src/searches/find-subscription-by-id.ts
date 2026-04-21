import { ZObject, Bundle } from 'zapier-platform-core';
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
      { key: 'subscription_id', label: 'Subscription ID', type: 'string', required: true },
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
      id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      status: 'active',
    },
  },
};
