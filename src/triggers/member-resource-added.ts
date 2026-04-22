import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_resource_added',
  noun: 'Member',
  label: 'Member Added to Resource',
  description: 'Triggers when a member gains access to a specific Telegram resource.',
  event: 'member.resource_added',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.resource_added',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      member: {
        id: 'mem_01HXMEMBERSAMPLE00000000000',
        project_id: 'prj_01HXPROJECTSAMPLE000000000',
        status: 'active',
      },
      resource: {
        id: 'res_01HXRESOURCESAMPLE00000000',
        project_id: 'prj_01HXPROJECTSAMPLE000000000',
        type: 'telegram_channel',
        title: 'Premium Channel',
      },
    },
  },
});
