import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_conversation_assigned',
  noun: 'Support Conversation',
  label: 'Support Conversation Assigned',
  description:
    'Triggers when a support conversation is handed to a team member, or when an existing assignment is cleared. `data.assigned_to_user_id` is null when it was cleared.',
  event: 'support.conversation.assigned',
  sample: {
    id: 'evt_01HXEXAMPLE333333333333333',
    type: 'support.conversation.assigned',
    created_at: '2026-05-18T10:35:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      conversation_id: 'sup_01HXCONVERSATIONSAMPLE00000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      assigned_to_user_id: 'usr_01HXTEAMMEMBERSAMPLE0000000',
    },
  },
});
