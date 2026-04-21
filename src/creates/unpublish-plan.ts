import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'unpublish_plan',
  noun: 'Plan',
  display: {
    label: 'Unpublish Plan',
    description: 'Deactivate a plan so new sign-ups can no longer purchase. Existing subscribers keep their subscription; only new sign-ups are blocked. Emits plan.deactivated.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true },
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}/unpublish`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: { id: 'pln_01HXPLANSAMPLE0000000000000', active: false },
  },
} satisfies Create;