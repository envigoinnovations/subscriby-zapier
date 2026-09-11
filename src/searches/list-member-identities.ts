import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_member_identities',
  noun: 'Member Identity',
  display: {
    label: 'List Member Identities',
    description:
      'List the platform accounts a project member has connected, with the one the project reaches first marked preferred.',
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
        url: `${apiBaseUrl()}/projects/${projectId}/members/${memberId}/identities`,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: '6a1f0c3e-2d4b-4e8a-9c7d-1b5e3f9a2c4d',
      connector: 'telegram',
      source: 'handshake',
      preferred: true,
      external_id: '123456789',
      display_name: 'Ada Lovelace',
      username: 'ada',
      linked_at: '2026-09-12T10:05:00Z',
    },
  },
} satisfies Search;
