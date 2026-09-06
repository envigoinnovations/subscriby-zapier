import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'retry_webhook_delivery',
  noun: 'Webhook Delivery',
  label: 'Retry Webhook Delivery',
  description:
    'Replay one failed or dead-lettered webhook delivery from the start of the retry ladder, posting the same event to the same endpoint again. A pending or already-delivered row is refused, because replaying it would post the event twice.',
  inputFields: [
    { key: 'delivery_id', label: 'Delivery ID', type: 'string', required: true, helpText: 'UUID of the delivery; find it with List Webhook Deliveries.' },
  ],
  path: (input) => `/webhook-deliveries/${input.delivery_id}/retry`,
  sample: {
    id: '34f1d78e-05a2-4b69-8c3d-7e921ab06f45',
    endpoint_id: 'c62a08f4-1b7d-4e35-9860-a37f5d21e0b9',
    event: 'subscription.created',
    event_id: '01HXZ3Q8M7Y2K4N6P9R1T3V5W7',
    status: 'pending',
    attempts: 0,
    response_status: null,
    response_excerpt: null,
    payload: { id: 'evt_01HXZ3Q8M7Y2K4N6P9R1T3V5W7', type: 'subscription.created' },
    next_attempt_at: '2026-09-06T09:20:00+00:00',
    delivered_at: null,
    dead_lettered_at: null,
    created_at: '2026-09-06T08:05:00+00:00',
  },
});
