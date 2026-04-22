import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_role',
  noun: 'Role',
  display: {
    label: 'Get Role',
    description: 'Retrieve a single role by UUID.',
  },
  operation: {
    inputFields: [
      { key: 'role_id', label: 'Role ID', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const roleId = bundle.inputData.role_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/roles/${roleId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: 'rol_01HXROLESAMPLE0000000000000',
      code: 'manager',
      name: 'Manager',
    },
  },
} satisfies Search;
