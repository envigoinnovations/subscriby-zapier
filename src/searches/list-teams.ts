import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_teams',
  noun: 'Team',
  display: {
    label: 'List Teams',
    description: 'List every team the authenticated user belongs to.',
  },
  operation: {
    inputFields: [
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Maximum number of teams to return. Leave blank for the server default.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.limit = bundle.inputData.limit;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/teams`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'tem_01HXTEAMSAMPLE0000000000000',
      name: 'Creator Team',
    },
  },
} satisfies Search;
