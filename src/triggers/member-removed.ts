import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_removed',
  noun: 'Member',
  label: 'Member Removed',
  description:
    'Triggers when a creator manually removes a subscriber from a project. The subscriber is soft-deleted, access is revoked, and any active subscription is cancelled.',
  event: 'member.removed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.removed',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscriber: {
        id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
        telegram_user_id: '123456789',
        status: 'churned',
      },
      reason: 'Removed by creator',
    },
  },
});
