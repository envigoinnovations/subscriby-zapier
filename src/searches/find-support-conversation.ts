import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_support_conversation',
  noun: 'Support Conversation',
  display: {
    label: 'Find Support Conversation',
    description: 'Fetch a single support conversation by ID.',
  },
  operation: {
    inputFields: [
      { key: 'conversation_id', label: 'Conversation ID', type: 'string', required: true, dynamic: 'dropdown_support_conversations.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const conversationId = bundle.inputData.conversation_id as string;

      const response = await z.request({ url: `${apiBaseUrl()}/support/conversations/${conversationId}` });

      handleHttpError(response, z);

      const conversation = (response.data as { data?: unknown }).data ?? response.data;

      // Searches must return an array, even for a single hit.
      return [conversation];
    },
    sample: {
      id: '9e042b6f-5d81-4c37-a920-7b3e18cf6d45',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      status: 'open',
    },
  },
} satisfies Search;
