import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';
import { sequenceSample, sequenceStepFields, sequenceStepsFrom } from './create-sequence';

export default {
  key: 'update_sequence',
  noun: 'Sequence',
  display: {
    label: 'Update Sequence',
    description:
      'Change a win-back sequence. Only the fields you fill in change; blank fields keep their value. Steps, when given, replace the whole list in order: a step still at its place keeps its id, the rest are added and the extra ones removed from the end. Switching the sequence off lets every member part-way through go.',
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
      {
        key: 'sequence_id',
        label: 'Sequence ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the sequence. Find it with Find Sequences.',
      },
      { key: 'name', label: 'Name', type: 'string', required: false, helpText: 'A new creator-facing label, 1–120 characters.' },
      {
        key: 'trigger',
        label: 'Trigger',
        type: 'string',
        required: false,
        choices: { churned: 'Member churned (their last live membership ended)' },
        helpText: 'What enrols a member. Only "Member churned" is available today.',
      },
      {
        key: 'active',
        label: 'Active',
        type: 'boolean',
        required: false,
        helpText: 'Switch the sequence on or off. Off lets every member part-way through go and enrols nobody until it runs again.',
      },
      ...sequenceStepFields,
      {
        key: 'clear_steps',
        label: 'Clear Steps',
        type: 'boolean',
        required: false,
        helpText: 'Set true to remove every step. Steps left blank alone keep the stored list.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const sequenceId = bundle.inputData.sequence_id as string;
      const body: Record<string, unknown> = {};

      if (bundle.inputData.name) {
        body.name = bundle.inputData.name;
      }

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

      if (bundle.inputData.clear_steps === true || bundle.inputData.clear_steps === 'true') {
        body.steps = [];
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/sequences/${sequenceId}`,
        method: 'PATCH',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: sequenceSample,
  },
} satisfies Create;
