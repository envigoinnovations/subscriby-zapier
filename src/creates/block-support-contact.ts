import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'block_support_contact',
  noun: 'Support Conversation',
  label: 'Block Support Contact',
  description:
    "Block the member behind a support conversation: their messages to the project's bot are dropped without notice and the thread cannot reopen on inbound. Their paid access is untouched — use Ban Member for moderation. Blocking an already-blocked contact changes nothing.",
  inputFields: [
    { key: 'conversation_id', label: 'Conversation ID', type: 'string', required: true, dynamic: 'dropdown_support_conversations.id.name' },
  ],
  path: (input) => `/support/conversations/${input.conversation_id}/block`,
  sample: { id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45', status: 'open', blocked_at: '2026-09-06T09:20:00Z' },
});
