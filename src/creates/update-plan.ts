import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';
import { PLAN_KIND_FIELD, planFieldsForKind, buildPlanBody } from '../utils/plan-fields';

export default {
  key: 'update_plan',
  noun: 'Plan',
  display: {
    label: 'Update Plan',
    description:
      'Partial-update an existing plan. Pick the kind the plan already is — the fields below change to match, and sending a block belonging to another kind is refused. Lifetime count=1, mutually-exclusive eligibility flags, recurring-vs-crypto and currency support checks all run server-side.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: true, dynamic: 'dropdown_plans.id.name' },
      {
        ...PLAN_KIND_FIELD,
        required: false,
        helpText:
          'Must match what the plan already is — leave it as the plan\'s own kind. Changing it converts the plan and discards the shape you moved away from.',
      },
      planFieldsForKind(false),
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;

      const body = buildPlanBody(bundle.inputData as Record<string, unknown>);

      /*
       * A partial update that never mentions the kind should not assert one.
       * buildPlanBody always stamps it, so drop it back out unless the Zap
       * explicitly set it — otherwise every update would look like a conversion.
       */
      if (bundle.inputData.kind === undefined || bundle.inputData.kind === '') {
        delete body.kind;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}`,
        method: 'PATCH',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: 'pln_01HXPLANSAMPLE0000000000000',
      kind: 'subscription',
      name: 'Premium Monthly',
      price: '29.00',
      cadence: 'Per Month',
      active: true,
      billing: {
        billing_cycle: 'month',
        billing_cycle_count: 1,
        recurring: true,
        trial_days: 7,
      },
    },
  },
} satisfies Create;
