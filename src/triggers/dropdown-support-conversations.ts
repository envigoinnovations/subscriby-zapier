import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_support_conversations',
  noun: 'Support Conversation',
  display: {
    label: 'New Support Conversation (Dropdown)',
    description: 'Powers the Support Conversation dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string' as const, required: false, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    ],
    perform: async (z: ZObject, bundle: Bundle) => {
      const projectId = bundle.inputData.project_id as string | undefined;
      const params: Record<string, unknown> = {};

      if (projectId) {
        params.project_id = projectId;
      }

      const response = await z.request({ url: `${apiBaseUrl()}/support/conversations`, params });
      handleHttpError(response, z);

      /*
       * The picker shows whoever the creator is talking to. member_name always
       * resolves to something readable; subject is optional and usually unset,
       * so leading with it would label most rows with a raw UUID.
       */
      return (
        (response.data as { data?: { id: string; member_name?: string | null; subject?: string | null }[] }).data ?? []
      ).map((row) => ({
        ...row,
        name: row.member_name ?? row.subject ?? row.id,
      }));
    },
    sample: { id: 'sup_01HXCONVERSATIONSAMPLE00000', name: 'Jane Doe' },
  },
} satisfies Trigger;
