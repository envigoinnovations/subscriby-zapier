import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'delete_webhook_endpoint',
  noun: 'Webhook Endpoint',
  display: {
    label: 'Delete Webhook Endpoint',
    description:
      'Remove a webhook endpoint. Pending deliveries will be dropped server-side.',
  },
  operation: {
    inputFields: [
      {
        key: 'endpoint_id',
        label: 'Endpoint ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the webhook endpoint to delete.',
        dynamic: 'dropdown_webhook_endpoints.id.url',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const endpointId = bundle.inputData.endpoint_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-endpoints/${endpointId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { id: endpointId, deleted: true };
    },
    sample: {
      id: 'c62a08f4-1b7d-4e35-9860-a37f5d21e0b9',
      deleted: true,
    },
  },
} satisfies Create;
