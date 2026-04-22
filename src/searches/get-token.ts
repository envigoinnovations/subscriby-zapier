import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_token',
  noun: 'Token',
  display: {
    label: 'Get Token',
    description: 'Retrieve metadata for a single personal access token by UUID.',
  },
  operation: {
    inputFields: [
      { key: 'token_id', label: 'Token ID', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const tokenId = bundle.inputData.token_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/tokens/${tokenId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: 'tok_01HXTOKENSAMPLE000000000000',
      name: 'Zapier Integration',
    },
  },
} satisfies Search;
