import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_support_conversations',
  noun: 'Support Conversation',
  display: {
    label: 'List Support Conversations',
    description: 'List support conversations, newest activity first, optionally filtered by project, status or assignee.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: false, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'status', label: 'Status', type: 'string', required: false, choices: ['open', 'pending', 'snoozed', 'resolved'] },
      { key: 'assigned_to', label: 'Assigned To', type: 'string', required: false, helpText: 'Team-member user ID.' },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '25' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.project_id) params.project_id = bundle.inputData.project_id;
      if (bundle.inputData.status) params.status = bundle.inputData.status;
      if (bundle.inputData.assigned_to) params.assigned_to = bundle.inputData.assigned_to;
      params.per_page = Math.min(Number(bundle.inputData.limit ?? 25), 100);

      const response = await z.request({ url: `${apiBaseUrl()}/support/conversations`, params });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      status: 'open',
      unread_count: 2,
    },
  },
} satisfies Search;
