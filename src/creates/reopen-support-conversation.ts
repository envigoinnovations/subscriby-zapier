import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'reopen_support_conversation',
  noun: 'Support Conversation',
  label: 'Reopen Support Conversation',
  description:
    'Put a resolved support conversation back in the open queue. A member writing back reopens a thread on its own; use this when a creator changes their mind or owes a follow-up before the member speaks again.',
  inputFields: [
    { key: 'conversation_id', label: 'Conversation ID', type: 'string', required: true, dynamic: 'dropdown_support_conversations.id.name' },
  ],
  path: (input) => `/support/conversations/${input.conversation_id}/reopen`,
  sample: { id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45', status: 'open' },
});
