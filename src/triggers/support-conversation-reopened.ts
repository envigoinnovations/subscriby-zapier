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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      conversation_id: 'sup_01HXCONVERSATIONSAMPLE00000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
    },
  },
});
