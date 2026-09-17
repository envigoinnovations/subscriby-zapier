import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'connector_outage_opened',
  noun: 'Connector Outage',
  label: 'Connector Outage Opened',
  description: 'Triggers when a platform refuses a project\'s live installation (token revoked, bot deleted): plans that unlock a place there go off sale until it answers again.',
  event: 'connector.outage_opened',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'connector.outage_opened',
    created_at: '2026-09-13T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
        connector: 'telegram',
        installation_id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
        outage_id: '9c1e4d2a-7b3f-4e8a-a2d1-5f6b7c8d9e0f',
        project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
        reason: 'connector_api_unauthorized',
        started_at: '2026-09-13T10:05:00Z',
    },
  },
});
