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
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscriber: {
        id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
        status: 'banned',
      },
      reason: 'Spamming referral links',
    },
  },
});
