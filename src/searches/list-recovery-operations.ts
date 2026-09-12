import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_recovery_operations',
  noun: 'Recovery Operation',
  display: {
    label: 'List Recovery Operations',
    description:
      'List every Disaster Recovery operation of the creator the token acts for — run by the creator, the platform or on demand — with its state and whether it can still be undone.',
  },
  operation: {
    inputFields: [
      {
        key: 'kind',
        label: 'Kind',
        type: 'string',
        required: false,
        choices: { account: 'Account', bot: 'Bot', resources: 'Channels & Groups' },
        helpText: 'Leave blank for every kind.',
      },
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: { started: 'In progress', completed: 'Completed', failed: 'Failed', reverted: 'Reverted' },
        helpText: 'Leave blank for every state.',
      },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '50' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.kind) params.kind = bundle.inputData.kind;
      if (bundle.inputData.status) params.status = bundle.inputData.status;
      params.per_page = Math.min(Number(bundle.inputData.limit ?? 50), 100);

      const response = await z.request({
        url: `${apiBaseUrl()}/recovery/operations`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: '9a4d2e71-5b38-4c6f-8e12-3d7c9b0a5f21',
      kind: 'resources',
      kind_label: 'Channels & Groups',
      status: 'completed',
      status_label: 'Completed',
      connector: 'telegram',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      project_name: 'Research Premium',
      grant_id: null,
      automatic: true,
      on_demand: false,
      failure_reason: null,
      started_at: '2026-09-12T03:19:10+00:00',
      completed_at: '2026-09-12T03:19:42+00:00',
      reverted_at: null,
      revertible: true,
      revert_window_ends_at: '2026-09-13T03:19:42+00:00',
    },
  },
} satisfies Search;
