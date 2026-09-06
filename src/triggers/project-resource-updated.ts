import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_resource_updated',
  noun: 'Resource',
  label: 'Resource Updated',
  description:
    "Triggers when a resource's title, description or on/off switch changes, from the dashboard, the API or an MCP tool. The payload carries a changes map naming only the fields that moved, so a Zap can react to a switch flip without diffing rows itself. Nothing fires when an edit restates the stored values.",
  event: 'project.resource.updated',
  sample: {
    id: 'evt_01HXEXAMPLERESOURCE00000001',
    type: 'project.resource.updated',
    created_at: '2026-09-06T09:14:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      resource: {
        id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
        title: 'Members lounge (VIP)',
        type: 'supergroup',
        chat_id: 'e4a7d2c9-1b63-4f08-9d5a-72c81e0f3b46',
        active: true,
      },
      changes: {
        title: { from: 'Members lounge', to: 'Members lounge (VIP)' },
      },
    },
  },
});
