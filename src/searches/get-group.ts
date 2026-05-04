import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_group',
  noun: 'Group',
  display: {
    label: 'Get Group',
    description: 'Retrieve a single collaborator group by UUID.',
  },
  operation: {
    inputFields: [
      { key: 'group_id', label: 'Group ID', type: 'string', required: true, dynamic: 'dropdown_groups.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const groupId = bundle.inputData.group_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/groups/${groupId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: 'grp_01HXGROUPSAMPLE00000000000',
      code: 'support',
      name: 'Support',
    },
  },
} satisfies Search;
