import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_sequence_enrollments',
  noun: 'Sequence Enrollment',
  display: {
    label: 'Find Sequence Enrollments',
    description:
      'List the passages members made through one recovery sequence, newest first: when they entered, the step due next, and how the passage ended if it has (won back, unreachable, the sequence switched off or deleted). Narrow to passages that ended one way.',
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
        key: 'sequence_id',
        label: 'Sequence ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the sequence. Find it with Find Sequences.',
      },
      {
        key: 'exit_reason',
        label: 'Way Out',
        type: 'string',
        required: false,
        choices: {
          reactivated: 'Won back (the member paid again)',
          opted_out: 'Unreachable (the platform could not deliver)',
          disabled: 'Sequence switched off',
          deleted: 'Sequence deleted',
        },
        helpText: 'Keep only the passages that ended this way. Leave blank for every passage, open ones included.',
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
      const sequenceId = bundle.inputData.sequence_id as string;
      const params: Record<string, unknown> = {};

      if (bundle.inputData.exit_reason) params.exit_reason = bundle.inputData.exit_reason;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/sequences/${sequenceId}/enrollments`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: 'd4e5f6a7-b8c9-4d0e-8f1a-2b3c4d5e6f7a',
      sequence_id: '9d2f4b6a-1c3e-4f58-8a7b-6e5d4c3b2a19',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      member: { id: 'a7b8c9d0-e1f2-4a3b-8c4d-5e6f7a8b9c0d', name: 'Ada Lovelace' },
      subscription_id: '2e4f6a8c-1b3d-4e5f-8a9b-0c1d2e3f4a5b',
      state: 'exited',
      enrolled_at: '2026-10-01T09:00:00+00:00',
      next_position: 2,
      next_due_at: null,
      completed_at: null,
      exited_at: '2026-10-05T14:30:00+00:00',
      exit_reason: 'reactivated',
    },
  },
} satisfies Search;
