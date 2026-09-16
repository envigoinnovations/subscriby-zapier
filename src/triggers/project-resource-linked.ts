import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_resource_linked',
  noun: 'Resource',
  label: 'Project Resource Linked',
  description:
    'Triggers when a creator links a place on a connector and it becomes a resource of the project; the payload names the connector, the kind (telegram:channel) and the space.',
  event: 'project.resource.linked',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.resource.linked',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      connector: 'telegram',
      kind: 'telegram:channel',
      space_id: '3c1f7a58-2b6e-4d90-8f41-6a2e9c5d7b10',
      title: 'Premium Channel',
    },
  },
});
