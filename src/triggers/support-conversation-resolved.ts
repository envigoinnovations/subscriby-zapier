import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_conversation_resolved',
  noun: 'Support Conversation',
  label: 'Support Conversation Resolved',
  description:
    'Triggers when a support conversation is marked resolved. Resolving is not final — the conversation reopens by itself if the member writes again, which raises Support Conversation Reopened.',
  event: 'support.conversation.resolved',
  sample: {
    id: 'evt_01HXEXAMPLE444444444444444',
    type: 'support.conversation.resolved',
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
