import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_broadcast',
  noun: 'Broadcast',
  display: {
    label: 'Get Broadcast',
    description:
      'Retrieve one broadcast by the ID Broadcast Message answered with: its status, how many got it, how many could not be reached and why, how long it took, and the line the creator reads. Poll it while progress.status is queued, running or paused, or wait for the Broadcast Completed trigger, which carries the same ID.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'broadcast_id', label: 'Broadcast ID', type: 'string', required: true, helpText: 'UUID of the broadcast; Broadcast Message answers it, and Find Broadcasts lists them.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const broadcastId = bundle.inputData.broadcast_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/broadcasts/${broadcastId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: '0192f4a6-3c1e-7d2b-9a8f-4e5d6c7b8a90',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      status: 'completed',
      source: 'api',
      connector: null,
      sent_by: { id: '0191a0c4-2b7e-7a1d-8c3f-5d6e7f8a9b0c', name: 'Ada Lovelace' },
      audience: 'customer',
      pass_window_id: null,
      plan_id: null,
      expiring_within_days: null,
      content: '<b>Doors open tonight</b> at 8.',
      recipients_estimated: 128,
      sent_count: 126,
      failed_count: 2,
      announcements_count: 0,
      failures_by_kind: { unreachable: 2 },
      progress: { status: 'completed', done: 128, total: 128, failed: 2, line: 'Sent to 126 of 128, 2 could not be reached, in 48s' },
      parent_id: null,
      last_error: null,
      started_at: '2026-11-04T14:02:11+00:00',
      finished_at: '2026-11-04T14:02:59+00:00',
      duration_ms: 48000,
      created_at: '2026-11-04T14:02:09+00:00',
      updated_at: '2026-11-04T14:02:59+00:00',
    },
  },
} satisfies Search;
