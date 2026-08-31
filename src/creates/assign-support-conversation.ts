import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'assign_support_conversation',
  noun: 'Support Conversation',
  display: {
    label: 'Assign Support Conversation',
    description:
      'Hand a support conversation to a team member. Leave Assignee empty to clear an existing assignment.',
  },
  operation: {
    inputFields: [
      { key: 'conversation_id', label: 'Conversation ID', type: 'string', required: true, dynamic: 'dropdown_support_conversations.id.name' },
      { key: 'assigned_to_user_id', label: 'Assignee', type: 'string', required: false, helpText: 'Team-member user ID. Leave empty to unassign.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const conversationId = bundle.inputData.conversation_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/support/conversations/${conversationId}/assign`,
        method: 'POST',
        // Sent explicitly rather than omitted: the API requires the key to be
        // present so an unassign is a deliberate null, not a missing field.
        body: { assigned_to_user_id: bundle.inputData.assigned_to_user_id ?? null },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: { id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45', assigned_to_user_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80' },
  },
} satisfies Create;
