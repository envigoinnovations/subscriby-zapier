import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_referrals',
  noun: 'Referral',
  display: {
    label: 'Find Referrals',
    description:
      'List the friends affiliates brought in, newest first: how each arrived, whether their first payment settled and until when the affiliate earns on them. Narrow by status, affiliate or "since", the earliest arrival to include, so a scheduled Zap can page only what happened since its last run.',
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
        choices: { touched: 'Touched — arrived, not yet paid', converted: 'Converted — first payment settled', expired: 'Expired', rejected: 'Rejected' },
        helpText: 'Leave blank for every status.',
      },
      { key: 'affiliate_id', label: 'Affiliate ID', type: 'string', required: false, helpText: 'UUID of one affiliate, to list only their referrals.' },
      { key: 'since', label: 'Since', type: 'datetime', required: false, helpText: 'Only referrals whose friend arrived on or after this instant.' },
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
      if (bundle.inputData.affiliate_id) params.affiliate_id = bundle.inputData.affiliate_id;
      if (bundle.inputData.since) params.since = bundle.inputData.since;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/referrals`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '3c4d5e6f-7081-4a2b-9c3d-4e5f6a7b8c9d',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      program_id: '6e2a7a4f-3b8c-4c21-9f6d-2a3b4c5d6e7f',
      affiliate_id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      member_id: 'b2c3d4e5-f6a7-4819-9b0c-1d2e3f4a5b6c',
      source: 'connector_link',
      connector: 'telegram',
      status: 'converted',
      touched_at: '2026-10-08T11:00:00+00:00',
      expires_at: '2026-11-07T11:00:00+00:00',
      converted_at: '2026-10-09T14:20:00+00:00',
      converted_subscription_id: '5d6e7f80-91a2-4b3c-8d4e-5f6a7b8c9d0e',
      commission_ends_at: '2027-04-09T14:20:00+00:00',
      created_at: '2026-10-08T11:00:00+00:00',
    },
  },
} satisfies Search;
