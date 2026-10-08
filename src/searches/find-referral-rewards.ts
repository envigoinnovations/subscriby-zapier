import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_referral_rewards',
  noun: 'Referral Reward',
  display: {
    label: 'Find Referral Rewards',
    description:
      'List the referral ledger, newest first: one row per settled payment per side of a referral, with the days or money it earned, whose it is and where it stands. Narrow by affiliate, status (pending, approved, paid, applied, reversed) or beneficiary (referrer, friend). A reversal is its own row with a negative amount.',
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
      { key: 'affiliate_id', label: 'Affiliate ID', type: 'string', required: false, helpText: 'UUID of one affiliate, to list only their rewards.' },
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: { pending: 'Pending — inside the hold', approved: 'Approved — payable', paid: 'Paid', applied: 'Applied — days banked on a membership', reversed: 'Reversed by a refund' },
      },
      {
        key: 'beneficiary',
        label: 'Beneficiary',
        type: 'string',
        required: false,
        choices: { referrer: 'Referrer', friend: 'Friend' },
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

      if (bundle.inputData.affiliate_id) params.affiliate_id = bundle.inputData.affiliate_id;
      if (bundle.inputData.status) params.status = bundle.inputData.status;
      if (bundle.inputData.beneficiary) params.beneficiary = bundle.inputData.beneficiary;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/referral-rewards`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '8e9f0a1b-2c3d-4e5f-8a9b-0c1d2e3f4a5b',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      program_id: '6e2a7a4f-3b8c-4c21-9f6d-2a3b4c5d6e7f',
      affiliate_id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      referral_id: '3c4d5e6f-7081-4a2b-9c3d-4e5f6a7b8c9d',
      payment_id: '9f0a1b2c-3d4e-4f5a-9b0c-1d2e3f4a5b6c',
      beneficiary: 'referrer',
      kind: 'cash',
      days: null,
      amount: '12.0000',
      currency_id: 'f0e1d2c3-b4a5-4697-8877-665544332211',
      currency: 'USD',
      status: 'approved',
      hold_until: '2026-10-23T14:20:01+00:00',
      approved_at: '2026-10-23T15:00:00+00:00',
      paid_at: null,
      reversed_at: null,
      applied_subscription_id: null,
      reverses_reward_id: null,
      payout_id: null,
      created_at: '2026-10-09T14:20:01+00:00',
    },
  },
} satisfies Search;
