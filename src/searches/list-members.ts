import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_members',
  noun: 'Member',
  display: {
    label: 'List Members',
    description: 'List members within a project, optionally filtered by status.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'status', label: 'Status', type: 'string', required: false, helpText: 'Optional member status filter.' },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '25' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const params: Record<string, unknown> = {};

      if (bundle.inputData.status) params.status = bundle.inputData.status;
      params.limit = bundle.inputData.limit ?? 25;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/members`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'mem_01HXMEMBERSAMPLE00000000000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      status: 'active',
    },
  },
} satisfies Search;
