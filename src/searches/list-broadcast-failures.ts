import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_broadcast_failures',
  noun: 'Broadcast Failure',
  display: {
    label: 'List Broadcast Failures',
    description:
      "List the members one broadcast could not reach, newest first, each with the connector's reading of why (unreachable, not_permitted, target_missing, rate_limited, configuration, transient, other) and the platform's own words when it gave any. Nothing is kept per successful recipient; the broadcast's sent_count is a tally.",
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'broadcast_id', label: 'Broadcast ID', type: 'string', required: true, helpText: 'UUID of the broadcast; find it with Find Broadcasts.' },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, helpText: 'Rows to return, 1 to 100. Defaults to 50.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const broadcastId = bundle.inputData.broadcast_id as string;

      const params: Record<string, unknown> = {};

      const limit = bundle.inputData.limit;
      if (limit !== undefined && limit !== null && limit !== '') {
        params.per_page = Math.min(Math.max(Number(limit), 1), 100);
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/broadcasts/${broadcastId}/failures`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '0192f4a7-1a2b-7c3d-8e4f-5a6b7c8d9e0f',
      broadcast_id: '0192f4a6-3c1e-7d2b-9a8f-4e5d6c7b8a90',
      member: { id: '0191b2d6-4e5f-7a6b-8c7d-9e0f1a2b3c4d', name: 'Marcus Reed' },
      kind: 'unreachable',
      detail: 'Forbidden: bot was blocked by the user',
      failed_at: '2026-11-04T14:02:31+00:00',
    },
  },
} satisfies Search;
