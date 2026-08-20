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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      message_id: 'msg_01HXMESSAGESAMPLE0000000001',
      conversation_id: 'sup_01HXCONVERSATIONSAMPLE00000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      type: 'text',
    },
  },
});
