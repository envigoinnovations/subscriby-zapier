import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'retry_dead_webhook_deliveries',
  noun: 'Webhook Delivery',
  display: {
    label: 'Retry Dead Webhook Deliveries',
    description:
      "Replay every webhook delivery the team dead-lettered since a point in time, once the consumer is fixed. Leave Since blank for the last 24 hours, the same window the dashboard's Replay button uses. Each replayed row posts its event again, so confirm the consumer is healthy first.",
  },
  operation: {
    inputFields: [
      {
        key: 'since',
        label: 'Since',
        type: 'datetime',
        required: false,
        helpText: 'Rows dead-lettered at or after this moment are replayed. Must not be in the future. Blank means 24 hours ago.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const body: Record<string, unknown> = {};

      if (bundle.inputData.since) {
        body.since = bundle.inputData.since;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-deliveries/retry-dead`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID(), 'Content-Type': 'application/json' },
        json: body,
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: { retried: 3, since: '2026-09-05T09:20:00+00:00' },
  },
} satisfies Create;
