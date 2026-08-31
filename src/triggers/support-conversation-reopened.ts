import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_conversation_reopened',
  noun: 'Support Conversation',
  label: 'Support Conversation Reopened',
  description:
    'Triggers when a resolved or snoozed support conversation returns to the open queue, either because a creator reopened it or because the member replied again.',
  event: 'support.conversation.reopened',
  sample: {
    id: 'evt_01HXEXAMPLE555555555555555',
    type: 'support.conversation.reopened',
    created_at: '2026-05-18T10:35:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      conversation_id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
    },
  },
});
