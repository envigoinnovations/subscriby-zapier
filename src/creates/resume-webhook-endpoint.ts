import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'resume_webhook_endpoint',
  noun: 'Webhook Endpoint',
  label: 'Resume Webhook Endpoint',
  description:
    'Restart deliveries to a paused webhook endpoint and clear its consecutive-failure streak, so a target that was fixed is not disabled again on its first miss. Events raised while it was paused are not replayed; use Retry Dead Webhook Deliveries for rows that dead-lettered before the pause.',
  inputFields: [
    { key: 'endpoint_id', label: 'Endpoint ID', type: 'string', required: true, dynamic: 'dropdown_webhook_endpoints.id.url' },
  ],
  path: (input) => `/webhook-endpoints/${input.endpoint_id}/resume`,
  sample: {
    id: 'c62a08f4-1b7d-4e35-9860-a37f5d21e0b9',
    name: 'CRM sync',
    url: 'https://hooks.example.com/subscriby',
    project_id: null,
    events: ['subscription.created', 'subscription.cancelled'],
    is_active: true,
    disabled_at: null,
    allowed_ips: [],
    failure_count: 0,
    consecutive_failures: 0,
    last_success_at: '2026-09-05T18:00:00Z',
    last_failure_at: null,
    created_at: '2026-05-18T10:05:00Z',
    updated_at: '2026-09-06T09:25:00Z',
  },
});
