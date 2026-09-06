import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_webhook_endpoint',
  noun: 'Webhook Endpoint',
  display: {
    label: 'Get Webhook Endpoint',
    description: 'Retrieve one of the team\'s outbound webhook endpoints by UUID. The signing secret is never returned; it exists in the create and rotate-secret responses only.',
  },
  operation: {
    inputFields: [
      { key: 'endpoint_id', label: 'Endpoint ID', type: 'string', required: true, dynamic: 'dropdown_webhook_endpoints.id.url' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const endpointId = bundle.inputData.endpoint_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-endpoints/${endpointId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: 'c62a08f4-1b7d-4e35-9860-a37f5d21e0b9',
      name: 'CRM sync',
      url: 'https://hooks.example.com/subscriby',
      project_id: null,
      events: ['subscription.created', 'subscription.cancelled'],
      is_active: true,
      disabled_at: null,
      allowed_ips: [],
      failure_count: 2,
      consecutive_failures: 0,
      last_success_at: '2026-09-05T18:00:00Z',
      last_failure_at: '2026-08-30T07:12:00Z',
      created_at: '2026-05-18T10:05:00Z',
      updated_at: '2026-09-05T18:00:00Z',
    },
  },
} satisfies Search;
