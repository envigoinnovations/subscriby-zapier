import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';
import { sequenceSample } from '../creates/create-sequence';

export default {
  key: 'find_sequences',
  noun: 'Sequence',
  display: {
    label: 'Find Sequences',
    description:
      "List a project's recovery sequences, newest first, each with its steps in order and how it has done: the members enrolled, still receiving steps, completed and won back. Narrow to running or paused sequences, or to one trigger.",
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
        key: 'active',
        label: 'Active',
        type: 'boolean',
        required: false,
        helpText: 'True for running sequences only, false for paused ones only. Leave blank for both.',
      },
      {
        key: 'trigger',
        label: 'Trigger',
        type: 'string',
        required: false,
        choices: { churned: 'Member churned' },
        helpText: 'Keep the sequences on one trigger.',
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

      if (bundle.inputData.active !== undefined && bundle.inputData.active !== null && bundle.inputData.active !== '') {
        params.active = bundle.inputData.active;
      }
      if (bundle.inputData.trigger) params.trigger = bundle.inputData.trigger;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/sequences`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: sequenceSample,
  },
} satisfies Search;
