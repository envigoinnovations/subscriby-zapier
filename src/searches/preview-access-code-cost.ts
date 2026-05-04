import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'preview_access_code_cost',
  noun: 'Access Code Cost Preview',
  display: {
    label: 'Preview Access Code Cost',
    description:
      'Preview the cost (in platform credits / currency) of generating a batch of access codes for a plan.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: true, dynamic: 'dropdown_plans.id.name' },
      { key: 'quantity', label: 'Quantity', type: 'integer', required: true, helpText: 'Number of codes to price-check.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}/access-codes/preview`,
        params: { quantity: bundle.inputData.quantity },
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      quantity: 100,
      total_cost: '9.00',
      currency_id: 'USD',
    },
  },
} satisfies Search;
