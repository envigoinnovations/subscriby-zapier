import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_resource_linked',
  noun: 'Resource',
  label: 'Project Resource Linked',
  description:
    'Triggers when a Telegram destination is linked to a project resource via the bot.',
  event: 'project.resource.linked',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.resource.linked',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      resource_id: 'rsr_01HXRESOURCESAMPLE00000000',
      type: 'channel',
      title: 'Premium Channel',
      chat_id: '-1001234567890',
    },
  },
});
