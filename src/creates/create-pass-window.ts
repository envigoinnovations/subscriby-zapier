import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_pass_window',
  noun: 'Pass Window',
  display: {
    label: 'Create Pass Window',
    description:
      "Place one dated access window by hand on a time-limited pass plan. It is marked manual, so a schedule rebuild keeps it. The start must be in the future and the plan's configured minimum and maximum length apply.",
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
      { key: 'plan_id', label: 'Pass Plan ID', type: 'string', required: true, dynamic: 'dropdown_plans.id.name', helpText: 'Must be a plan of kind pass.' },
      {
        key: 'starts_at',
        label: 'Starts At',
        type: 'datetime',
        required: true,
        helpText: "When the window opens. A value without a UTC offset is read in the plan's own pass timezone.",
      },
      { key: 'duration_minutes', label: 'Duration (Minutes)', type: 'integer', required: true, helpText: 'How long the window runs, a whole number of at least 1.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}/pass-windows`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID(), 'Content-Type': 'application/json' },
        json: {
          starts_at: bundle.inputData.starts_at,
          duration_minutes: bundle.inputData.duration_minutes,
        },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
      plan_id: '9b7c2e15-4d63-4f80-a2b1-7e5d0c9f3a46',
      plan_name: 'Saturday session',
      starts_at: '2026-10-03T09:00:00+00:00',
      ends_at: '2026-10-03T11:00:00+00:00',
      timezone: 'Europe/London',
      local_range: 'Sat 3 Oct, 10:00–12:00 BST',
      duration_minutes: 120,
      status: 'scheduled',
      source: 'manual',
      sellable: true,
      holders: 0,
    },
  },
} satisfies Create;
