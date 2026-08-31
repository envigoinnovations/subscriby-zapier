import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_message_sent',
  noun: 'Support Message',
  label: 'Support Message Sent',
  description:
    'Triggers when you or a team member replies to a member. Useful for measuring response times or mirroring replies into a shared log. Internal notes never raise this event — they are private and are not delivered to the member.',
  event: 'support.message.sent',
  sample: {
    id: 'evt_01HXEXAMPLE777777777777777',
    type: 'support.message.sent',
    created_at: '2026-05-18T10:35:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      message_id: '2f80d641-9c37-4a58-b1e6-0459ac7d3e82',
      conversation_id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      type: 'text',
    },
  },
});
