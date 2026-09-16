import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_resource_unlinked',
  noun: 'Resource',
  label: 'Project Resource Unlinked',
  description:
    'Triggers when the place behind a project resource is detached; the resource keeps its kind and connector and is bound to no space until the creator links another.',
  event: 'project.resource.unlinked',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.resource.unlinked',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      resource: {
        id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
        title: 'Premium Channel',
        kind: 'telegram:channel',
        connector: 'telegram',
        space: null,
        active: true,
      },
    },
  },
});
