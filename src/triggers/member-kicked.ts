import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_kicked',
  noun: 'Member',
  label: 'Member Kicked',
  description:
    'Triggers when a subscriber is kicked from a project. Unlike Ban, kick removes the member from the Telegram group without flipping their status to Banned — they can re-join if access is restored.',
  event: 'member.kicked',
  sample: {
    id: 'evt_01HXEXAMPLEBBBBBBBBBBBBBBB',
    type: 'member.kicked',
    created_at: '2026-05-18T10:41:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscriber: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        telegram_user_id: '123456789',
      },
      reason: 'inactive_90_days',
    },
  },
});
