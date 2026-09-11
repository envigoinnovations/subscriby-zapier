import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'reissue_subscription_grants',
  noun: 'Subscription',
  display: {
    label: 'Reissue Subscription Grants',
    description:
      'Revoke the access grants a member holds on a subscription — every resource, or one — and have fresh ones issued. The invite links they held die and the bot sends them the new ones. Raises Subscriber Access Reissued per resource, then Subscriber Gained Resource Access for each fresh grant.',
  },
  operation: {
    inputFields: [
      { key: 'subscription_id', label: 'Subscription ID', type: 'string', required: true, dynamic: 'dropdown_subscriptions.id.id' },
      {
        key: 'resource_id',
        label: 'Resource ID',
        type: 'string',
        required: false,
        helpText: 'Limit the reissue to one resource of the plan. Leave empty to reissue every resource the subscription grants.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const subscriptionId = bundle.inputData.subscription_id as string;
      const resourceId = bundle.inputData.resource_id as string | undefined;

      const response = await z.request({
        url: `${apiBaseUrl()}/subscriptions/${subscriptionId}/grants/reissue`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
        body: resourceId ? { resource_id: resourceId } : {},
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? { subscription_id: subscriptionId };
    },
    sample: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      reissued: 2,
      status: 'reissue_queued',
    },
  },
} satisfies Create;
