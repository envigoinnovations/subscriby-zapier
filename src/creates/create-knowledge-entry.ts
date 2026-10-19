import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_knowledge_entry',
  noun: 'Knowledge Entry',
  display: {
    label: 'Create Knowledge Entry',
    description:
      'Teach Subscriby Copilot something only the project knows: a question with its answer, or a document sent as text. The entry is cut into passages and indexed before the step returns, so a Members & Team entry can answer a member at once. A project holds at most 200 entries.',
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
      {
        key: 'kind',
        label: 'Kind',
        type: 'string',
        required: true,
        choices: { question: 'Question & Answer', document: 'Document' },
        helpText: 'A question with the answer the Copilot may give, or a guide cut into passages. Fixed once the entry exists.',
      },
      { key: 'title', label: 'Title', type: 'string', required: true, helpText: "The question, or the document's name, 2–160 characters." },
      { key: 'body', label: 'Body', type: 'text', required: true, helpText: "The answer, or the document's text, 2–50,000 characters. Markdown headings are kept." },
      {
        key: 'audience',
        label: 'Audience',
        type: 'string',
        required: false,
        choices: { members: 'Members & Team', team: 'Team Only' },
        helpText: 'Who may be answered from it. Members & Team lets the Copilot read it to members in the inbox, the project bot and the portal chat; Team Only serves your own surfaces alone. Defaults to Members & Team.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {
        kind: bundle.inputData.kind,
        title: bundle.inputData.title,
        body: bundle.inputData.body,
      };

      if (bundle.inputData.audience) {
        body.audience = bundle.inputData.audience;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/knowledge`,
        method: 'POST',
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
      audience: 'members',
      audience_label: 'Members & Team',
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
      updated_at: '2026-10-19T16:02:11Z',
    },
  },
} satisfies Create;
