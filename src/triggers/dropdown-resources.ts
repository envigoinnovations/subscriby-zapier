import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_resources',
  noun: 'Resource',
  display: {
    label: 'New Resource (Dropdown)',
    description: 'Powers the Resource dropdown in action and search fields.',
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
      const response = await z.request({ url: `${apiBaseUrl()}/projects/${projectId}/resources` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: { id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6', name: 'Premium Channel' },
  },
} satisfies Trigger;
