import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'connector_settings_updated',
  noun: 'Connector Installation',
  label: 'Connector Settings Updated',
  description: 'Triggers when a declared setting of an installation changes; names the fields, never the values.',
  event: 'connector.settings_updated',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'connector.settings_updated',
    created_at: '2026-09-12T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
        connector: 'discord',
        installation_id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
        project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
        changed_fields: [
            'greeting',
        ],
    },
  },
});
