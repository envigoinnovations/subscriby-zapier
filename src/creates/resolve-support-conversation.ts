import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'resolve_support_conversation',
  noun: 'Support Conversation',
  display: {
    label: 'Resolve Support Conversation',
    description:
      'Mark a support conversation resolved, clearing it from the open queue. Nothing is deleted, and the conversation reopens by itself if the member writes again.',
  },
  operation: {
    inputFields: [
      { key: 'conversation_id', label: 'Conversation ID', type: 'string', required: true, dynamic: 'dropdown_support_conversations.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const conversationId = bundle.inputData.conversation_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/support/conversations/${conversationId}/resolve`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: { id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45', status: 'resolved' },
  },
} satisfies Create;
