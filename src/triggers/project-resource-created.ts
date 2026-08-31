import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_resource_created',
  noun: 'Resource',
  label: 'Project Resource Created',
  description:
    'Triggers when a project resource (manual link, Telegram channel/group/supergroup) is created.',
  event: 'project.resource.created',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.resource.created',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      resource: {
        id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
        title: 'Premium Channel',
        type: 'channel',
        chat_id: '-1001234567890',
        active: true,
      },
    },
  },
});
