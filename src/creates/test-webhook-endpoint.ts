import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'test_webhook_endpoint',
  noun: 'Webhook Endpoint',
  display: {
    label: 'Test Webhook Endpoint',
    description:
      'Send a synthetic test event to a webhook endpoint. Useful for verifying the receiver signature + 2xx handling before relying on production deliveries.',
  },
  operation: {
    inputFields: [
      {
        key: 'endpoint_id',
        label: 'Endpoint ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the webhook endpoint to ping.',
        dynamic: 'dropdown_webhook_endpoints.id.url',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const endpointId = bundle.inputData.endpoint_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-endpoints/${endpointId}/test`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: 'c62a08f4-1b7d-4e35-9860-a37f5d21e0b9',
      test_event_id: 'evt_01HXEXAMPLE000000000000000',
    },
  },
} satisfies Create;
