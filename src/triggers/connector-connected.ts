import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'connector_connected',
  noun: 'Connector Installation',
  label: 'Connector Connected',
  description: 'Triggers when the creator connects an installation with their credentials and the connector can act for the project.',
  event: 'connector.connected',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'connector.connected',
    created_at: '2026-09-12T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
        connector: 'telegram',
        installation_id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
        project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
        display_name: 'Research Bot',
        handle: 'research_bot',
    },
  },
});
