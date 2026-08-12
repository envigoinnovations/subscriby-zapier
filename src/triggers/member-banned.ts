import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_banned',
  noun: 'Member',
  label: 'Member Banned',
  description:
    'Triggers when a creator (or a team member with project-user:update) bans a subscriber. Active subscriptions are cancelled and resources are revoked simultaneously.',
  event: 'member.banned',
  sample: {
    id: 'evt_01HXEXAMPLE777777777777777',
    type: 'member.banned',
    created_at: '2026-05-18T10:40:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscriber: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        telegram_user_id: '123456789',
        status: 'banned',
      },
      reason: 'Spamming referral links',
    },
  },
});
