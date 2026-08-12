import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_resource_unlinked',
  noun: 'Resource',
  label: 'Project Resource Unlinked',
  description:
    'Triggers when a Telegram destination is unlinked from a project resource.',
  event: 'project.resource.unlinked',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.resource.unlinked',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      resource: {
        id: 'rsr_01HXRESOURCESAMPLE00000000',
        title: 'Premium Channel',
        type: 'channel',
        chat_id: null,
        active: true,
      },
    },
  },
});
