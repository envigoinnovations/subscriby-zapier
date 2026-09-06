import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_webhook_delivery',
  noun: 'Webhook Delivery',
  display: {
    label: 'Get Webhook Delivery',
    description: 'Retrieve one outbound webhook delivery by UUID: its event, status, attempts, the payload that was posted and what the endpoint answered.',
  },
  operation: {
    inputFields: [
      { key: 'delivery_id', label: 'Delivery ID', type: 'string', required: true, helpText: 'UUID of the delivery; find it with List Webhook Deliveries.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const deliveryId = bundle.inputData.delivery_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-deliveries/${deliveryId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
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
