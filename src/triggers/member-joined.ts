import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_joined',
  noun: 'Member',
  label: 'Member Joined',
  description:
    'Triggers when a new member is added to one of the project\'s resources — typically right after a successful subscription activation.',
  event: 'member.joined',
  sample: {
    id: 'evt_01HXEXAMPLE666666666666666',
    type: 'member.joined',
    created_at: '2026-05-18T10:35:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscriber: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        name: 'Jane Doe',
        chat_id: '123456789',
      },
      resource: {
        id: 'res_01HXRESOURCESAMPLE00000000',
        type: 'group',
        name: 'Premium Chat',
      },
    },
  },
});
