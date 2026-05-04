import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_member_by_id',
  noun: 'Member',
  display: {
    label: 'Find Member by ID',
    description: 'Look up a project member by their UUID. Pair with Member Joined / Member Banned triggers for follow-up steps.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'member_id', label: 'Member ID', type: 'string', required: true, dynamic: 'dropdown_members.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const memberId = bundle.inputData.member_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/members/${memberId}`,
      });

      if (response.status === 404) {
        return [];
      }

      handleHttpError(response, z);

      const row = (response.data as { data?: unknown }).data ?? response.data;

      return row ? [row] : [];
    },
    sample: {
      id: 'usr_01HXUSERSAMPLE0000000000000',
      telegram_user_id: '123456789',
      status: 'customer',
    },
  },
} satisfies Search;