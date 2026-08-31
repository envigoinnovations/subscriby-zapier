import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_message_received',
  noun: 'Support Message',
  label: 'Support Message Received',
  description:
    'Triggers when a member sends a support message to your bot — the workhorse trigger for routing questions into a helpdesk, an ops channel, or an on-call rota. The message body is NOT in the payload: fetch it with GET /v1/support/conversations/{id}/messages so member text is never copied into webhook logs.',
  event: 'support.message.received',
  sample: {
    id: 'evt_01HXEXAMPLE666666666666666',
    type: 'support.message.received',
    created_at: '2026-05-18T10:35:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      message_id: '6c18f7a3-2e95-4d60-b47a-c093e5182b7f',
      conversation_id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      type: 'text',
      has_attachments: false,
    },
  },
});
