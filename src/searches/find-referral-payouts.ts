import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_referral_payouts',
  noun: 'Referral Payout',
  display: {
    label: 'Find Referral Payouts',
    description:
      'List the payouts recorded against a project\'s affiliates, newest first: how much was paid, in which currency, the creator\'s reference and note, and how many commissions each payout covered. Narrow to one affiliate.',
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
      { key: 'affiliate_id', label: 'Affiliate ID', type: 'string', required: false, helpText: 'UUID of one affiliate, to list only their payouts.' },
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
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/referral-payouts`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      affiliate_id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      amount: '30.0000',
      currency_id: 'f0e1d2c3-b4a5-4697-8877-665544332211',
      currency: 'USD',
      reference: 'PAYPAL-7F3D1C92',
      note: null,
      paid_at: '2026-11-01T10:00:00+00:00',
      recorded_by_user_id: 'd4e5f6a7-b8c9-4d0e-8f1a-2b3c4d5e6f70',
      rewards_paid: 3,
      created_at: '2026-11-01T10:00:00+00:00',
    },
  },
} satisfies Search;
