import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_webhook_deliveries',
  noun: 'Webhook Delivery',
  display: {
    label: 'List Webhook Deliveries',
    description:
      "List the team's outbound webhook delivery log, newest first — what was posted, what the endpoint answered and where each row is on the retry ladder. Narrow by status to find the failed or dead-lettered rows worth retrying.",
  },
  operation: {
    inputFields: [
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: { all: 'All', pending: 'Pending', delivered: 'Delivered', failed: 'Failed (waiting for the next retry)', dead: 'Dead-lettered' },
        helpText: 'One tab of the delivery log. Blank means every status.',
      },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, helpText: 'Rows to return, 1 to 100. Defaults to 25.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      const status = bundle.inputData.status;
      if (status && status !== 'all') {
        params.status = status;
      }

      const limit = bundle.inputData.limit;
      if (limit !== undefined && limit !== null && limit !== '') {
        params.per_page = Math.min(Math.max(Number(limit), 1), 100);
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-deliveries`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '34f1d78e-05a2-4b69-8c3d-7e921ab06f45',
      endpoint_id: 'c62a08f4-1b7d-4e35-9860-a37f5d21e0b9',
      event: 'subscription.created',
      event_id: '01HXZ3Q8M7Y2K4N6P9R1T3V5W7',
      status: 'failed',
      attempts: 2,
      response_status: 500,
      response_excerpt: 'upstream unavailable',
      payload: { id: 'evt_01HXZ3Q8M7Y2K4N6P9R1T3V5W7', type: 'subscription.created' },
      next_attempt_at: '2026-09-06T10:15:00+00:00',
      delivered_at: null,
      dead_lettered_at: null,
      created_at: '2026-09-06T10:05:00+00:00',
    },
  },
} satisfies Search;
