import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_knowledge_entry',
  noun: 'Knowledge Entry',
  display: {
    label: 'Update Knowledge Entry',
    description:
      "Change a Knowledge entry's title, text or audience. Partial: only the fields you fill in change. New words are cut into passages again at once and the old passages go; a new audience alone moves the member boundary without rewriting them. The kind cannot change.",
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
      { key: 'knowledge_entry_id', label: 'Knowledge Entry ID', type: 'string', required: true, helpText: 'UUID of the entry.' },
      { key: 'title', label: 'Title', type: 'string', required: false, helpText: '2–160 characters. Leave blank to keep the stored title.' },
      { key: 'body', label: 'Body', type: 'text', required: false, helpText: '2–50,000 characters. Leave blank to keep the stored text.' },
      {
        key: 'audience',
        label: 'Audience',
        type: 'string',
        required: false,
        choices: { members: 'Members & Team', team: 'Team Only' },
        helpText: 'Who may be answered from it. Leave blank to keep the stored audience.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const entryId = bundle.inputData.knowledge_entry_id as string;

      const body: Record<string, unknown> = {};

      for (const key of ['title', 'body', 'audience']) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/knowledge/${entryId}`,
        method: 'PATCH',
        headers: { 'Idempotency-Key': randomUUID(), 'Content-Type': 'application/json' },
        json: body,
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '3b7e4d2a-9c1f-4a6b-8d5e-2f7c9a1b3e4d',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      kind: 'question',
      kind_label: 'Question & Answer',
      audience: 'team',
      audience_label: 'Team Only',
      status: 'ready',
      status_label: 'Ready',
      title: 'When does my membership renew?',
      body: 'Memberships renew on the first day of every month, at the price you joined on.',
      file_name: null,
      file_size: null,
      mime: null,
      chunk_count: 1,
      characters: 64,
      failure: null,
      indexed_at: '2026-10-19T16:02:11Z',
      created_at: '2026-10-19T16:02:11Z',
      updated_at: '2026-10-19T17:12:45Z',
    },
  },
} satisfies Create;
