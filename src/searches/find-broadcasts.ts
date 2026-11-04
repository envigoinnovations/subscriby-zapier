import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_broadcasts',
  noun: 'Broadcast',
  display: {
    label: 'Find Broadcasts',
    description:
      "List the broadcasts a project sent, newest first: who sent each one and from where, the audience, how many got it, how many could not be reached and the line the creator reads on the Broadcasts page. Narrow to the ones still sending, the completed or the failed. History starts with the Subscriby release that keeps it.",
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
        key: 'filter',
        label: 'Filter',
        type: 'string',
        required: false,
        choices: {
          all: 'All',
          sending: 'Sending (queued, sending or paused by the platform)',
          completed: 'Completed',
          failed: 'Failed',
        },
        helpText: 'One tab of the Broadcasts page. Blank means every broadcast.',
      },
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: {
          queued: 'Queued',
          sending: 'Sending',
          paused: 'Paused',
          completed: 'Completed',
          failed: 'Failed',
        },
        helpText: 'One exact status. Blank means every status.',
      },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, helpText: 'Rows to return, 1 to 100. Defaults to 25.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      if (!projectId) {
        return [];
      }

      const params: Record<string, unknown> = {};

      const filter = bundle.inputData.filter;
      if (filter && filter !== 'all') {
        params.filter = filter;
      }

      const status = bundle.inputData.status;
      if (status) {
        params.status = status;
      }

      const limit = bundle.inputData.limit;
      if (limit !== undefined && limit !== null && limit !== '') {
        params.per_page = Math.min(Math.max(Number(limit), 1), 100);
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/broadcasts`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '0192f4a6-3c1e-7d2b-9a8f-4e5d6c7b8a90',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      status: 'completed',
      source: 'dashboard',
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
