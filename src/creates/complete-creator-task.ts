import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'complete_creator_task',
  noun: 'Creator Task',
  display: {
    label: 'Complete Creator Task',
    description:
      'Mark a hand-arranged perk as handed over. The task is recorded done by the token\'s user, the subscriber\'s grant is issued, and Creator Task Completed then Member Added to Resource fire for it. A task already done, or one whose purchase has ended, is refused.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name' },
      {
        key: 'task_id',
        label: 'Task ID',
        type: 'string',
        required: true,
        helpText: 'From List Creator Tasks or the Creator Task Opened trigger.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const taskId = bundle.inputData.task_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/creator-tasks/${taskId}/complete`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
        body: {},
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? { id: taskId };
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
      completed_at: '2026-09-12T10:35:00+00:00',
      completed_by_user_id: '0a7d3c1e-5b28-4f96-a3e1-6d9c2b8f4e10',
      created_at: '2026-09-12T10:05:30+00:00',
    },
  },
} satisfies Create;
