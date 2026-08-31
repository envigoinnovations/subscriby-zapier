import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'delete_access_code',
  noun: 'Access Code',
  display: {
    label: 'Delete Access Code',
    description:
      'Delete (invalidate) a specific access code on a plan. Redeemed codes remain locked — only unredeemed codes can be removed.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the project.',
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      {
        key: 'plan_id',
        label: 'Plan ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the plan that owns the code.',
        dynamic: 'dropdown_plans.id.name',
      },
      {
        key: 'access_code_id',
        label: 'Access Code ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the access code row to delete.',
        dynamic: 'dropdown_access_codes.id.code',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;
      const accessCodeId = bundle.inputData.access_code_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}/access-codes/${accessCodeId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { id: accessCodeId, deleted: true };
    },
    sample: {
      id: '30a7f5c1-8e94-4b26-a07d-6c15b9e2f483',
      deleted: true,
    },
  },
} satisfies Create;
