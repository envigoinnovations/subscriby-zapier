import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';
import { PLAN_KIND_FIELD, planFieldsForKind, buildPlanBody } from '../utils/plan-fields';

export default {
  key: 'create_plan',
  noun: 'Plan',
  display: {
    label: 'Create Plan',
    description:
      'Create a plan on a Subscriby project. Pick a kind first — a recurring subscription, a time-limited pass that sells one dated window, or a pass series that sells a whole slate of your pass plans\' windows for one payment. The fields below change to match.',
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
      PLAN_KIND_FIELD,
      planFieldsForKind(true),
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans`,
        method: 'POST',
        body: buildPlanBody(bundle.inputData as Record<string, unknown>),
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
