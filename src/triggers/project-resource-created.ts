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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      resource: {
        id: 'res_01HXRESOURCESAMPLE00000000',
        project_id: 'prj_01HXPROJECTSAMPLE000000000',
        type: 'telegram_channel',
        title: 'Premium Channel',
      },
    },
  },
});
