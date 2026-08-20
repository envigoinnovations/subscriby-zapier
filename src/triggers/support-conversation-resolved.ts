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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      conversation_id: 'sup_01HXCONVERSATIONSAMPLE00000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
    },
  },
});
