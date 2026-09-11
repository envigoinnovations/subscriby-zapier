import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_creator_tasks',
  noun: 'Creator Task',
  display: {
    label: 'List Creator Tasks',
    description:
      'List the hand-arranged perks a creator still has to hand over in a project — one task per subscriber and manual resource, oldest first — or the ones already done.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name' },
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: { open: 'Open', completed: 'Completed', all: 'All' },
        helpText: 'Open (the default) is tasks not yet done whose purchase still stands.',
      },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '50' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const params: Record<string, unknown> = {};

      if (bundle.inputData.status) params.status = bundle.inputData.status;
      params.per_page = Math.min(Number(bundle.inputData.limit ?? 50), 100);

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/creator-tasks`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: '9e4b2c71-3d58-4a6f-b0e2-7c1d5f8a9b34',
      grant_id: '7d1c3e9a-2b64-4f0e-9a58-3c6b1d8e2f47',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      resource_title: 'Welcome packet',
      instructions: 'Give Ada Lovelace access to Welcome packet.',
      due_at: null,
      completed_at: null,
      completed_by_user_id: null,
      created_at: '2026-09-12T10:05:30+00:00',
    },
  },
} satisfies Search;
