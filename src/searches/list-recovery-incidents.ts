import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_recovery_incidents',
  noun: 'Recovery Incident',
  display: {
    label: 'List Recovery Incidents',
    description:
      'List the Disaster Recovery incidents of the creator the token acts for — what the health probes found broken, open by default — with the reason in the connector\'s words.',
  },
  operation: {
    inputFields: [
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: { open: 'Open', resolved: 'Resolved', all: 'All' },
        helpText: 'Open (the default) is what still needs attention.',
      },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '50' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.status) params.status = bundle.inputData.status;
      params.per_page = Math.min(Number(bundle.inputData.limit ?? 50), 100);

      const response = await z.request({
        url: `${apiBaseUrl()}/recovery/incidents`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: '6f1e9b27-4c3a-4d58-9e02-b7a1c5d38f64',
      kind: 'resources',
      kind_label: 'Channels & Groups',
      status: 'open',
      status_label: 'Open',
      connector: 'telegram',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      project_name: 'Research Premium',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      resource_title: 'Signals',
      reason: 'chat_not_found',
      reason_label: 'Channel not found',
      reason_explanation: '**Most likely cause:** Telegram deleted or banned the channel. Replace it with a new one.',
      detected_at: '2026-09-12T03:19:04+00:00',
      resolved_at: null,
      resolved_by_operation_id: null,
    },
  },
} satisfies Search;
