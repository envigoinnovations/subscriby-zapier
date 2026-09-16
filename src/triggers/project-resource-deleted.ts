import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_resource_deleted',
  noun: 'Resource',
  label: 'Project Resource Deleted',
  description: 'Triggers when a project resource row is deleted.',
  event: 'project.resource.deleted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.resource.deleted',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      resource: {
        id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
        title: 'Premium Channel',
        kind: 'telegram:channel',
        connector: 'telegram',
        space: {
          id: '3c1f7a58-2b6e-4d90-8f41-6a2e9c5d7b10',
          external_id: '-1001234567890',
          title: 'Premium Channel',
        },
        active: true,
      },
    },
  },
});
