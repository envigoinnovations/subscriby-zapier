import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_subscription_grants',
  noun: 'Grant',
  display: {
    label: 'List Subscription Grants',
    description:
      'List the access grants a subscription holds: one per resource (and per pass window), with the connector, how access was given, where it stands and why it failed if it did.',
  },
  operation: {
    inputFields: [
      {
        key: 'subscription_id',
        label: 'Subscription ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_subscriptions.id.id',
        helpText: 'The subscription whose access grants to read.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const subscriptionId = bundle.inputData.subscription_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/subscriptions/${subscriptionId}/grants`,
      });

      if (response.status === 404) {
        return [];
      }

      handleHttpError(response, z);

      const rows = (response.data as { data?: Record<string, unknown>[] }).data ?? [];

      return rows;
    },
    sample: {
      id: '7d1c3e9a-2b64-4f0e-9a58-3c6b1d8e2f47',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      resource_id: 'c9e21f37-8a4b-4d56-b1e0-2f7c9d3a6e15',
      window_id: null,
      identity_id: '0c2d8a7e-4b1f-4d3e-9a6b-2f5e8c1d7a90',
      connector: 'telegram',
      mode: 'bearer_link',
      state: 'granted',
      reference: 'https://t.me/+AbCdEfGhIjKlMnOp',
      granted_at: '2026-09-12T10:05:00+00:00',
      revoked_at: null,
      failure_kind: null,
      failure_detail: null,
      created_at: '2026-09-12T10:04:58+00:00',
    },
  },
} satisfies Search;
