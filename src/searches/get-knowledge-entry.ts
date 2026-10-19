import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_knowledge_entry',
  noun: 'Knowledge Entry',
  display: {
    label: 'Get Knowledge Entry',
    description: "Retrieve one Knowledge entry by UUID, with its text: the answer, or the document's words as the Copilot reads them.",
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'knowledge_entry_id', label: 'Knowledge Entry ID', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const entryId = bundle.inputData.knowledge_entry_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/knowledge/${entryId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
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
} satisfies Search;
