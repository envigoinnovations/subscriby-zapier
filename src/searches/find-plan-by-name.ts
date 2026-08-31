import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_plan_by_name',
  noun: 'Plan',
  display: {
    label: 'Find Plan by Name',
    description: 'Look up a plan by its name within a specific project.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'name', label: 'Plan Name', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const name = bundle.inputData.name as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans`,
      });

      handleHttpError(response, z);

      const plans = ((response.data as { data?: unknown[] }).data ?? []) as Array<{ name: string }>;

      return plans.filter((row) => row.name === name);
    },
    sample: {
      id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      name: 'Premium Monthly',
      price: '29.00',
    },
  },
} satisfies Search;