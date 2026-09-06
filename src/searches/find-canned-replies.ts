import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_canned_replies',
  noun: 'Canned Reply',
  display: {
    label: 'Find Canned Replies',
    description: "List the saved replies in a project's support picker, in picker order.",
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      if (!projectId) {
        return [];
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/support/canned-replies`,
        params: { per_page: 100 },
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: 'c0a8f3d2-6b41-4e7a-9c25-8d1f0e3b7a64',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      title: 'Opening hours',
      body: 'We answer between 9 and 5, Monday to Friday.',
      shortcut: 'hours',
      sort_order: 1,
      created_at: '2026-09-06T09:20:00Z',
      updated_at: '2026-09-06T09:20:00Z',
    },
  },
} satisfies Search;
