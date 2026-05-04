import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'cancel_subscription',
  noun: 'Subscription',
  display: {
    label: 'Cancel Subscription',
    description:
      'Queues cancellation for a MemberPass subscription. Provider-side cancellation + local state mutation run asynchronously; the action returns once the job is queued.',
  },
  operation: {
    inputFields: [
      {
        key: 'subscription_id',
        label: 'Subscription ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the subscription to cancel.',
        dynamic: 'dropdown_subscriptions.id.id',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const response = await z.request({
        url: `${apiBaseUrl()}/subscriptions/${bundle.inputData.subscription_id as string}/cancel`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      status: 'cancellation_queued',
    },
  },
} satisfies Create;