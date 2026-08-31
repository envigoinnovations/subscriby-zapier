import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_groups',
  noun: 'Group',
  display: {
    label: 'List Groups',
    description: 'List every collaborator group defined on the current team.',
  },
  operation: {
    inputFields: [
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Maximum number of groups to return. Leave blank for the server default.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/groups`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: '1f68d92a-04c5-4e83-97b1-3d6a05e2f847',
      code: 'support',
      name: 'Support',
    },
  },
} satisfies Search;
