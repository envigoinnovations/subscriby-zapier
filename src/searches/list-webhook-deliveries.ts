import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_webhook_deliveries',
  noun: 'Webhook Delivery',
  display: {
    label: 'List Webhook Deliveries',
    description: 'List the most recent webhook events for a given event type.',
  },
  operation: {
    inputFields: [
      { key: 'type', label: 'Event Type', type: 'string', required: true, helpText: 'Event name to filter on (e.g. subscription.created).' },
      { key: 'project_id', label: 'Project ID', type: 'string', required: false, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, helpText: 'Between 1 and 10.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {
        type: bundle.inputData.type,
      };

      if (bundle.inputData.project_id) params.project_id = bundle.inputData.project_id;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.limit = bundle.inputData.limit;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-events`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'evt_01HXEXAMPLE000000000000000',
      type: 'subscription.created',
      created_at: '2026-05-18T10:05:00Z',
    },
  },
} satisfies Search;
