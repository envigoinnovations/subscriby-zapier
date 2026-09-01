import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'unpause_subscription',
  noun: 'Subscription',
  display: {
    label: 'Unpause Subscription Access',
    description: 'Restore a suspended member’s access, issuing fresh invite links. Only works on a subscription that is currently paused.',
  },
  operation: {
    inputFields: [
      {
        key: 'subscription_id',
        label: 'Subscription ID',
        type: 'string',
        required: true,
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const subscriptionId = bundle.inputData.subscription_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/subscriptions/${subscriptionId}/unpause`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      payment_status: 'active',
      outcome: 'active',
    },
  },
} satisfies Create;
