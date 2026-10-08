import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_referral_affiliates',
  noun: 'Referral Affiliate',
  display: {
    label: 'Find Referral Affiliates',
    description:
      'List the members enrolled in a project\'s Referral Program, newest first, optionally narrowed by status or to one member. A list row never carries the per-currency balances; use Get Referral Affiliate for what one affiliate is owed. Payout details an affiliate typed are never returned.',
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
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: { pending: 'Pending approval', approved: 'Approved', suspended: 'Suspended' },
        helpText: 'Leave blank for every status.',
      },
      {
        key: 'member_id',
        label: 'Member',
        type: 'string',
        required: false,
        dynamic: 'dropdown_members.id.name',
        helpText: 'Find one member\'s affiliate row.',
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

      if (bundle.inputData.status) params.status = bundle.inputData.status;
      if (bundle.inputData.member_id) params.member_id = bundle.inputData.member_id;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/referral-affiliates`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      program_id: '6e2a7a4f-3b8c-4c21-9f6d-2a3b4c5d6e7f',
      member_id: 'a1b2c3d4-e5f6-4718-8a9b-0c1d2e3f4a5b',
      code: 'ADA2026',
      status: 'approved',
      days_balance: 0,
      joined_at: '2026-10-08T09:05:00+00:00',
      approved_at: '2026-10-08T10:00:00+00:00',
      created_at: '2026-10-08T09:05:00+00:00',
      updated_at: '2026-10-08T10:00:00+00:00',
    },
  },
} satisfies Search;
