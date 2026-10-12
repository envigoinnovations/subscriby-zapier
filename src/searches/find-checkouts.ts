import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

/**
 * A Zapier boolean input as the query string the API reads: "true" or "false", or nothing when blank.
 */
const booleanParam = (value: unknown): string | undefined => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  return value === true || value === 'true' ? 'true' : 'false';
};

export default {
  key: 'find_checkouts',
  noun: 'Checkout',
  display: {
    label: 'Find Checkouts',
    description:
      "List the checkouts a project's members started on the portal or in the project bot, newest first: the member, the plan they were buying, the rail and where they started, when it started, when the hourly sweep counted it as stalled and when a payment finished it, summed up as an outcome. Narrow to the stalled or the recovered ones, one plan or one member.",
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
        key: 'stalled',
        label: 'Stalled',
        type: 'boolean',
        required: false,
        helpText: 'Yes for the checkouts the hourly sweep counted as stalled (the project\'s checkout window passed with no payment), no for the ones it never did. Leave blank for both.',
      },
      {
        key: 'recovered',
        label: 'Recovered',
        type: 'boolean',
        required: false,
        helpText: 'Yes for the stalled checkouts a payment finished after all, no for the stalled ones still open. Leave blank for both.',
      },
      {
        key: 'plan_id',
        label: 'Plan ID',
        type: 'string',
        required: false,
        helpText: 'Keep only the checkouts of one plan.',
      },
      {
        key: 'member_id',
        label: 'Member ID',
        type: 'string',
        required: false,
        helpText: "Keep only one member's checkouts, by their member ID as Find Members lists them.",
      },
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Rows per page, 1–100. Leave blank for the server default of 25.',
      },
      { key: 'page', label: 'Page', type: 'integer', required: false, helpText: '1-indexed.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const params: Record<string, unknown> = {};

      for (const key of ['stalled', 'recovered'] as const) {
        const value = booleanParam(bundle.inputData[key]);
        if (value !== undefined) params[key] = value;
      }

      if (bundle.inputData.plan_id) params.plan_id = bundle.inputData.plan_id;
      if (bundle.inputData.member_id) params.member_id = bundle.inputData.member_id;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/retention/checkouts`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      member: { id: 'a7b8c9d0-e1f2-4a3b-8c4d-5e6f7a8b9c0d', name: 'Ada Lovelace' },
      plan: { id: '2e4f6a8c-1b3d-4e5f-8a9b-0c1d2e3f4a5b', name: 'Inner Circle' },
      provider: 'stripe',
      surface: 'portal',
      reference: 'cs_test_a1B2c3D4',
      method_id: '6f7a8b9c-0d1e-4f2a-9b3c-4d5e6f7a8b9c',
      outcome: 'recovered',
      started_at: '2026-10-12T09:00:00+00:00',
      stalled_at: '2026-10-12T10:00:00+00:00',
      completed_at: '2026-10-12T15:30:00+00:00',
      payment_id: 'c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f',
      enrollment_id: 'd4e5f6a7-b8c9-4d0e-8f1a-2b3c4d5e6f7a',
    },
  },
} satisfies Search;
