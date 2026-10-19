import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_knowledge_entries',
  noun: 'Knowledge Entry',
  display: {
    label: 'Find Knowledge Entries',
    description:
      "List what a project has taught Subscriby Copilot, newest first: every Knowledge entry with its kind, who may be answered from it, whether its passages are in the index, its title and how many passages it became. The rows carry no text; Get Knowledge Entry does.",
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
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Rows per page, 1–100. Leave blank for the server default of 25.',
      },
      { key: 'page', label: 'Page', type: 'integer', required: false, helpText: '1-indexed.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const params: Record<string, unknown> = {};

      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/knowledge`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
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
      body: null,
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
