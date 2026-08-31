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
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscriber: {
        id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
        telegram_user_id: '123456789',
        status: 'churned',
      },
    },
  },
});
