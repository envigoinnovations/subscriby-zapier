import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_canned_reply',
  noun: 'Canned Reply',
  display: {
    label: 'Get Canned Reply',
    description: 'Retrieve one saved support reply by UUID.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'canned_reply_id', label: 'Canned Reply ID', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const replyId = bundle.inputData.canned_reply_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/support/canned-replies/${replyId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
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
