import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_plan_by_id',
  noun: 'Plan',
  display: {
    label: 'Find Plan by ID',
    description: 'Look up a plan by its UUID on a given project. Direct lookup — faster than the name-based search for ID-driven flows.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: true, dynamic: 'dropdown_plans.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}`,
      });

      if (response.status === 404) {
        return [];
      }

      handleHttpError(response, z);

      const row = (response.data as { data?: unknown }).data ?? response.data;

      return row ? [row] : [];
    },
    sample: {
      id: 'pln_01HXPLANSAMPLE0000000000000',
      name: 'Premium Monthly',
      price: '9.99',
      billing_cycle: 'month',
      active: true,
    },
  },
} satisfies Search;