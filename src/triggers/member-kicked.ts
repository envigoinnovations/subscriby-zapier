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
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscriber: {
        id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
        status: 'churned',
      },
      reason: 'Inactive for 90 days',
    },
  },
});
