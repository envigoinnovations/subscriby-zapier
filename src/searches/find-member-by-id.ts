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
      id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      identities: [{ connector: 'telegram', external_id: '123456789', preferred: true }],
      status: 'customer',
    },
  },
} satisfies Search;