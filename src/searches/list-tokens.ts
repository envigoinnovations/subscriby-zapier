import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_tokens',
  noun: 'Token',
  display: {
    label: 'List Tokens',
    description: 'List every personal access token issued for the authenticated user / team.',
  },
  operation: {
    inputFields: [
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Maximum number of tokens to return. Leave blank for the server default.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.limit = bundle.inputData.limit;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/tokens`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'tok_01HXTOKENSAMPLE000000000000',
      name: 'Zapier Integration',
    },
  },
} satisfies Search;
