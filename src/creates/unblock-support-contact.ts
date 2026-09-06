import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'unblock_support_contact',
  noun: 'Support Conversation',
  label: 'Unblock Support Contact',
  description:
    'Lift a support block so the member behind the conversation can reach the inbox again. Unblocking a contact who is not blocked changes nothing.',
  inputFields: [
    { key: 'conversation_id', label: 'Conversation ID', type: 'string', required: true, dynamic: 'dropdown_support_conversations.id.name' },
  ],
  path: (input) => `/support/conversations/${input.conversation_id}/unblock`,
  sample: { id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45', status: 'open', blocked_at: null },
});
