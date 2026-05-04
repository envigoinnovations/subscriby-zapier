import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_members',
  noun: 'Member',
  display: {
    label: 'New Member (Dropdown)',
    description: 'Powers the Member dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string' as const, required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    ],
    perform: async (z: ZObject, bundle: Bundle) => {
      const projectId = bundle.inputData.project_id as string | undefined;
      if (!projectId) {
        return [];
      }
      const response = await z.request({ url: `${apiBaseUrl()}/projects/${projectId}/members` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: { id: 'usr_01HXUSERSAMPLE0000000000000', name: 'John Doe' },
  },
} satisfies Trigger;
