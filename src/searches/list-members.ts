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
      params.per_page = Math.min(Number(bundle.inputData.limit ?? 25), 100);

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/members`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: '6f9b2e37-c184-4a05-8d72-30e16bc9f458',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      status: 'active',
    },
  },
} satisfies Search;
