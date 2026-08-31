import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'rotate_webhook_secret',
  noun: 'Webhook Endpoint',
  display: {
    label: 'Rotate Webhook Secret',
    description:
      'Regenerate the signing secret for a webhook endpoint. The new plaintext secret is returned once — store it immediately.',
  },
  operation: {
    inputFields: [
      {
        key: 'endpoint_id',
        label: 'Endpoint ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the webhook endpoint whose secret should be rotated.',
        dynamic: 'dropdown_webhook_endpoints.id.url',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const endpointId = bundle.inputData.endpoint_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-endpoints/${endpointId}/rotate-secret`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      const envelope = response.data as { data?: Record<string, unknown>; secret?: string };

      return {
        ...(envelope.data ?? {}),
        secret: envelope.secret,
      };
    },
    sample: {
      id: 'c62a08f4-1b7d-4e35-9860-a37f5d21e0b9',
      secret: 'whsec_rotated_example_value_shown_once',
    },
  },
} satisfies Create;
