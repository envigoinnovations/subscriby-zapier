import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_message_received',
  noun: 'Support Message',
  label: 'Support Message Received',
  description:
    'Triggers whenever a member sends a support message to your bot — the workhorse trigger for routing questions into a helpdesk, an ops channel, or an on-call rota. The message body is NOT in the payload: fetch it with GET /v1/support/conversations/{id}/messages so member text is never copied into webhook logs.',
  event: 'support.message.received',
  sample: {
    id: 'evt_01HXEXAMPLE666666666666666',
    type: 'support.message.received',
    created_at: '2026-05-18T10:35:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      message_id: 'msg_01HXMESSAGESAMPLE0000000000',
      conversation_id: 'sup_01HXCONVERSATIONSAMPLE00000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      type: 'text',
      has_attachments: false,
    },
  },
});
