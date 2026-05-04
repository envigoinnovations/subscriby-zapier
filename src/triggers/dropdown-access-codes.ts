import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_access_codes',
  noun: 'Access Code',
  display: {
    label: 'New Access Code (Dropdown)',
    description: 'Powers the Access Code dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string' as const, required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'plan_id', label: 'Plan ID', type: 'string' as const, required: true, dynamic: 'dropdown_plans.id.name' },
    ],
    perform: async (z: ZObject, bundle: Bundle) => {
      const projectId = bundle.inputData.project_id as string | undefined;
      const planId = bundle.inputData.plan_id as string | undefined;
      if (!projectId || !planId) {
        return [];
      }
      const response = await z.request({ url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}/access-codes` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: { id: 'acc_01HXACCESSCODESAMPLE0000000', code: 'ABC-123' },
  },
} satisfies Trigger;
