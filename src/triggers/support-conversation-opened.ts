import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_conversation_opened',
  noun: 'Support Conversation',
  label: 'Support Conversation Opened',
  description:
    'Triggers when a member messages your bot with something it does not recognise for the first time, opening a support conversation. Fires once per member per channel — their later messages raise Support Message Received instead.',
  event: 'support.conversation.opened',
  sample: {
    id: 'evt_01HXEXAMPLE222222222222222',
    type: 'support.conversation.opened',
    created_at: '2026-05-18T10:35:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      conversation_id: 'sup_01HXCONVERSATIONSAMPLE00000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      channel: 'telegram',
    },
  },
});
