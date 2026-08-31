import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_roles',
  noun: 'Role',
  display: {
    label: 'List Roles',
    description: 'List every role defined for the current team.',
  },
  operation: {
    inputFields: [
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Maximum number of roles to return. Leave blank for the server default.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/roles`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'd05e1a83-7c46-4f29-b613-8ae407c9d251',
      code: 'manager',
      name: 'Manager',
    },
  },
} satisfies Search;
