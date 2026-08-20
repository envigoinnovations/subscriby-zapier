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
      id: 'sup_01HXCONVERSATIONSAMPLE00000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      status: 'open',
    },
  },
} satisfies Search;
