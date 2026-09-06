import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'pause_webhook_endpoint',
  noun: 'Webhook Endpoint',
  label: 'Pause Webhook Endpoint',
  description:
    'Stop deliveries to a webhook endpoint without deleting it. Events raised while it is paused are not queued for it and are not replayed on resume. Only the member who registered the endpoint, or the team owner, may pause it.',
  inputFields: [
    { key: 'endpoint_id', label: 'Endpoint ID', type: 'string', required: true, dynamic: 'dropdown_webhook_endpoints.id.url' },
  ],
  path: (input) => `/webhook-endpoints/${input.endpoint_id}/pause`,
  sample: {
    id: 'c62a08f4-1b7d-4e35-9860-a37f5d21e0b9',
    name: 'CRM sync',
    url: 'https://hooks.example.com/subscriby',
    project_id: null,
    events: ['subscription.created', 'subscription.cancelled'],
    is_active: false,
    disabled_at: '2026-09-06T09:20:00Z',
    allowed_ips: [],
    failure_count: 0,
    consecutive_failures: 0,
    last_success_at: '2026-09-05T18:00:00Z',
    last_failure_at: null,
    created_at: '2026-05-18T10:05:00Z',
    updated_at: '2026-09-06T09:20:00Z',
  },
});
