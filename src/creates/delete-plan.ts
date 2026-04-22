import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'delete_plan',
  noun: 'Plan',
  display: {
    label: 'Delete Plan',
    description:
      'Permanently delete a plan within a project. Active subscriptions must be migrated or cancelled beforehand — the API rejects deletes otherwise.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the owning project.',
      },
      {
        key: 'plan_id',
        label: 'Plan ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the plan to delete.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { id: planId, deleted: true };
    },
    sample: {
      id: 'pln_01HXPLANSAMPLE0000000000000',
      deleted: true,
    },
  },
} satisfies Create;
