import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'connector_installed',
  noun: 'Connector Installation',
  label: 'Connector Installed',
  description: 'Triggers when a connector is installed on a project: a pending installation with no credentials yet.',
  event: 'connector.installed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'connector.installed',
    created_at: '2026-09-12T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
        connector: 'discord',
        installation_id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
        project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
        state: 'pending',
    },
  },
});
