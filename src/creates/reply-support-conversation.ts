import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'reply_support_conversation',
  noun: 'Support Message',
  display: {
    label: 'Reply to Support Conversation',
    description:
      'Send a reply to a member in a support conversation. The member receives it on Telegram as a bot message attributed to you, so treat this as sending a real message to a real person. Set Internal Note to record a private remark for your team instead.',
  },
  operation: {
    inputFields: [
      { key: 'conversation_id', label: 'Conversation ID', type: 'string', required: true, dynamic: 'dropdown_support_conversations.id.name' },
      { key: 'body', label: 'Reply', type: 'text', required: true, helpText: 'Reaches the member verbatim. Max 4000 characters.' },
      { key: 'internal', label: 'Private Note', type: 'boolean', required: false, helpText: 'Record a private note for your team instead of replying to the member.' },
      { key: 'reply_to_message_id', label: 'Quote Message ID', type: 'string', required: false, helpText: 'Optional. A message in this same conversation to quote above the reply.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const conversationId = bundle.inputData.conversation_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/support/conversations/${conversationId}/messages`,
        method: 'POST',
        body: {
          body: bundle.inputData.body,
          internal: bundle.inputData.internal ?? false,
          /* Omitted entirely when blank: the API rejects a non-uuid value. */
          ...(bundle.inputData.reply_to_message_id
            ? { reply_to_message_id: bundle.inputData.reply_to_message_id }
            : {}),
        },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '2f80d641-9c37-4a58-b1e6-0459ac7d3e82',
      conversation_id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45',
      direction: 'outbound',
      delivery_status: 'pending',
    },
  },
} satisfies Create;
