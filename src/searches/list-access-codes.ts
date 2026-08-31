import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_access_codes',
  noun: 'Access Code',
  display: {
    label: 'List Access Codes',
    description: 'List access codes for a plan, optionally filtered by status.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: true, dynamic: 'dropdown_plans.id.name' },
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: { unredeemed: 'Unredeemed', redeemed: 'Redeemed', expired: 'Expired' },
      },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '50' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;
      const params: Record<string, unknown> = {};

      if (bundle.inputData.status) params.status = bundle.inputData.status;
      params.per_page = Math.min(Number(bundle.inputData.limit ?? 50), 100);

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}/access-codes`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: '30a7f5c1-8e94-4b26-a07d-6c15b9e2f483',
      code: 'PREMIUM-2026',
      status: 'unredeemed',
    },
  },
} satisfies Search;
