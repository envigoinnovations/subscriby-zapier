import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_webhook_endpoints',
  noun: 'Webhook Endpoint',
  display: {
    label: 'List Webhook Endpoints',
    description: 'List every webhook endpoint registered for the team.',
  },
  operation: {
    inputFields: [
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Maximum number of endpoints to return. Leave blank for the server default.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-endpoints`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'whe_01HXWEBHOOKENDPOINTSAMPLE00',
      url: 'https://hooks.zapier.com/hooks/catch/1/abc123/',
      is_active: true,
    },
  },
} satisfies Search;
