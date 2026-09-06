import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_conversation_blocked',
  noun: 'Support Conversation',
  label: 'Support Contact Blocked',
  description:
    "Triggers when a creator blocks the member behind a support conversation: their messages to the project's bot are dropped from then on and the thread cannot reopen on inbound. Fires once per block, never for a repeat; the member's paid access is untouched.",
  event: 'support.conversation.blocked',
  sample: {
    id: 'evt_01HXEXAMPLESUPPORTBLOCK0001',
    type: 'support.conversation.blocked',
    created_at: '2026-09-06T09:40:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      conversation_id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
    },
  },
});
