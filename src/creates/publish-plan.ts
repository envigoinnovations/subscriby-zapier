import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'publish_plan',
  noun: 'Plan',
  display: {
    label: 'Publish Plan',
    description: 'Activate a plan so new sign-ups can purchase it. Emits plan.activated. Noop if already active.',
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
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}/publish`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: { id: 'pln_01HXPLANSAMPLE0000000000000', active: true },
  },
} satisfies Create;