import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_unbanned',
  noun: 'Member',
  label: 'Member Unbanned',
  description:
    'Triggers when a previously banned subscriber has their ban lifted. Use for re-engagement flows, welcome-back messages, or audit logging.',
  event: 'member.unbanned',
  sample: {
    id: 'evt_01HXEXAMPLECCCCCCCCCCCCCCC',
    type: 'member.unbanned',
    created_at: '2026-05-18T10:42:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscriber: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        telegram_user_id: '123456789',
        status: 'active',
      },
    },
  },
});
