import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'connector_uninstalled',
  noun: 'Connector Installation',
  label: 'Connector Uninstalled',
  description: 'Triggers when a connector is uninstalled from a project: its grants revoked, its resources detached, the row kept; with the counts of what that touched.',
  event: 'connector.uninstalled',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'connector.uninstalled',
    created_at: '2026-09-12T11:30:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      connector: 'discord',
      installation_id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      grants_revoked: 41,
      resources_detached: 2,
      plans_unpublished: 1,
      subscriptions_cancelled: 17,
    },
  },
});
