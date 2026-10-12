import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

/**
 * The line items Zapier collects for the steps, shaped as the API takes them.
 */
export const sequenceStepsFrom = (raw: unknown): Array<Record<string, unknown>> | undefined => {
  if (!Array.isArray(raw)) {
    return undefined;
  }

  return raw
    .filter((step): step is Record<string, unknown> => typeof step === 'object' && step !== null)
    .map((step) => {
      const body: Record<string, unknown> = {
        delay_days: Number(step.delay_days),
        body: step.body,
      };

      if (step.coupon_id !== undefined && step.coupon_id !== null && step.coupon_id !== '') {
        body.coupon_id = step.coupon_id;
      }

      return body;
    });
};

export const sequenceStepFields = [
  {
    key: 'steps',
    label: 'Steps',
    required: false,
    helpText: 'The steps in the order they go out, at most 8. Each waits its days after the step before (the first after the trigger\'s moment) and sends its message with {name}, {project}, {coupon}, {discount} and {link} filled in.',
    children: [
      {
        key: 'delay_days',
        label: 'Delay (Days)',
        type: 'integer',
        required: true,
        helpText: 'Days after the trigger for the first step, 0–180 (0 goes out on the next hourly run); days after the step before for the rest, 1–180.',
      },
      {
        key: 'body',
        label: 'Message',
        type: 'text',
        required: true,
        helpText: 'Up to 1,000 characters. Use {link} for the way to the plan, {coupon} and {discount} when the step carries a coupon.',
      },
      {
        key: 'coupon_id',
        label: 'Coupon ID',
        type: 'string',
        required: false,
        helpText: 'One of the project\'s coupons to carry with the step. Leave blank for none.',
      },
    ],
  },
] satisfies Create['operation']['inputFields'];

export const sequenceSample = {
  id: '9d2f4b6a-1c3e-4f58-8a7b-6e5d4c3b2a19',
  project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
  name: 'Win-back after churn',
  trigger: 'churned',
  active: true,
  steps: [
    {
      id: '4e8a2c6d-7b1f-4d93-a5c0-8f2e1b7d6c54',
      position: 1,
      delay_days: 3,
      body: 'Hi {name}, your place in {project} is still here whenever you want it back: {link}',
      coupon: null,
    },
    {
      id: 'b1c7e9f3-2a4d-4e86-9b0c-5d7f8a2e1c43',
      position: 2,
      delay_days: 7,
      body: 'Still thinking it over? {coupon} takes {discount} off your first month back: {link}',
      coupon: { id: '3b7c9d1e-5f24-4a86-9c0b-2d4e6f8a1b3c', code: 'COMEBACK20' },
    },
  ],
  counts: { enrolled: 12, open: 4, completed: 6, won_back: 2 },
  created_at: '2026-10-01T09:00:00+00:00',
  updated_at: '2026-10-10T08:00:00+00:00',
  deleted_at: null,
};

export default {
  key: 'create_sequence',
  noun: 'Sequence',
  display: {
    label: 'Create Sequence',
    description:
      'Build a sequence on a project: the ordered messages a member receives on the days you choose after one of four moments (they left, they arrived as a lead, their checkout stalled, their trial is about to end), each with the way to the plan as a button. The steps are written with the sequence in one call. Needs Growth or the Revenue Recovery Addon on the project owner.',
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
      { key: 'name', label: 'Name', type: 'string', required: true, helpText: 'A creator-facing label, 1–120 characters.' },
      {
        key: 'trigger',
        label: 'Trigger',
        type: 'string',
        required: false,
        choices: {
          churned: 'Member churned (their last live membership ended)',
          lead: 'New lead (they arrived without buying)',
          stalled_checkout: 'Checkout stalled (a checkout stayed open past the project\'s window)',
          trial_ending: 'Trial ending (a trial without a card is about to end)',
        },
        helpText: 'What enrols a member. Leave blank for "Member churned".',
      },
      {
        key: 'active',
        label: 'Active',
        type: 'boolean',
        required: false,
        helpText: 'Whether the sequence enrols and sends from the start. Leave blank for yes.',
      },
      ...sequenceStepFields,
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const body: Record<string, unknown> = { name: bundle.inputData.name };

      if (bundle.inputData.trigger) {
        body.trigger = bundle.inputData.trigger;
      }

      if (bundle.inputData.active !== undefined && bundle.inputData.active !== null && bundle.inputData.active !== '') {
        body.active = bundle.inputData.active === true || bundle.inputData.active === 'true';
      }

      const steps = sequenceStepsFrom(bundle.inputData.steps);

      if (steps && steps.length > 0) {
        body.steps = steps;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/sequences`,
        method: 'POST',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: sequenceSample,
  },
} satisfies Create;
