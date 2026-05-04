import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_plans',
  noun: 'Plan',
  display: {
    label: 'New Plan (Dropdown)',
    description: 'Powers the Plan dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string' as const, required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    ],
    perform: async (z: ZObject, bundle: Bundle) => {
      const projectId = bundle.inputData.project_id as string | undefined;
      if (!projectId) return [] as { id: string }[];
      const response = await z.request({ url: `${apiBaseUrl()}/projects/${projectId}/plans` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: {
      id: 'pln_01HXPLANSAMPLE0000000000000',
      name: 'Premium Monthly',
    },
  },
} satisfies Trigger;
