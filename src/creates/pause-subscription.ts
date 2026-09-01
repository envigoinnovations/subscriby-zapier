import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'pause_subscription',
  noun: 'Subscription',
  display: {
    label: 'Pause Subscription Access',
    description: 'Suspend a member’s access to the project’s linked Telegram resources. Billing is NOT affected — the payment provider keeps charging on schedule. Use Unpause Subscription Access to restore it with fresh invite links.',
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
        url: `${apiBaseUrl()}/subscriptions/${subscriptionId}/pause`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      payment_status: 'paused',
      outcome: 'paused',
    },
  },
} satisfies Create;
