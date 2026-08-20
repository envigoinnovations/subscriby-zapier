import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_support_messages',
  noun: 'Support Message',
  display: {
    label: 'List Support Messages',
    description:
      'List the messages in a support conversation, oldest first. This is where the message bodies live — the Support Message Received trigger deliberately omits them so member text never lands in webhook logs. Internal notes are only returned when the token can also write to the conversation.',
  },
  operation: {
    inputFields: [
      { key: 'conversation_id', label: 'Conversation ID', type: 'string', required: true, dynamic: 'dropdown_support_conversations.id.name' },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '50' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const conversationId = bundle.inputData.conversation_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/support/conversations/${conversationId}/messages`,
        params: { per_page: Math.min(Number(bundle.inputData.limit ?? 50), 100) },
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: 'msg_01HXMESSAGESAMPLE0000000000',
      conversation_id: 'sup_01HXCONVERSATIONSAMPLE00000',
      direction: 'inbound',
      body: 'My invite link stopped working.',
    },
  },
} satisfies Search;
