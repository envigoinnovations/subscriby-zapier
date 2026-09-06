import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_canned_reply',
  noun: 'Canned Reply',
  display: {
    label: 'Create Canned Reply',
    description:
      "Save a reply snippet to a project's support picker, so agents can insert it with one click or by typing its shortcut. The shortcut must be unique within the project.",
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      { key: 'title', label: 'Title', type: 'string', required: true, helpText: 'The label shown in the picker, 2–80 characters.' },
      { key: 'body', label: 'Body', type: 'text', required: true, helpText: 'The text inserted when the reply is picked, 2–4,000 characters.' },
      {
        key: 'shortcut',
        label: 'Shortcut',
        type: 'string',
        required: false,
        helpText: 'A keyword agents type to pick the reply. Letters, numbers, dashes and underscores, up to 30 characters, unique within the project.',
      },
      {
        key: 'sort_order',
        label: 'Sort Order',
        type: 'integer',
        required: false,
        helpText: 'Position in the picker, 0–999; lower comes first.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {
        title: bundle.inputData.title,
        body: bundle.inputData.body,
      };

      for (const key of ['shortcut', 'sort_order']) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/support/canned-replies`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID(), 'Content-Type': 'application/json' },
        json: body,
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
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
} satisfies Create;
