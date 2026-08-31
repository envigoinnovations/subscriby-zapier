import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'revoke_token',
  noun: 'Token',
  display: {
    label: 'Revoke Token',
    description:
      'Revoke a personal access token. Subsequent requests using that token will fail with 401.',
  },
  operation: {
    inputFields: [
      {
        key: 'token_id',
        label: 'Token ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the token to revoke.',
        dynamic: 'dropdown_tokens.id.name',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const tokenId = bundle.inputData.token_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/tokens/${tokenId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { id: tokenId, deleted: true };
    },
    sample: {
      id: '1284',
      deleted: true,
    },
  },
} satisfies Create;
