import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_referral_affiliate',
  noun: 'Referral Affiliate',
  display: {
    label: 'Get Referral Affiliate',
    description:
      'Retrieve one affiliate by UUID with their code, status, days balance and "balances" per currency: pending (inside the hold), earned, payable (what Record Referral Payout may record) and paid out, each a decimal string. The payout details they typed are never returned.',
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
        key: 'affiliate_id',
        label: 'Affiliate ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the affiliate. Find it with Find Referral Affiliates.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const affiliateId = bundle.inputData.affiliate_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/referral-affiliates/${affiliateId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      program_id: '6e2a7a4f-3b8c-4c21-9f6d-2a3b4c5d6e7f',
      member_id: 'a1b2c3d4-e5f6-4718-8a9b-0c1d2e3f4a5b',
      code: 'ADA2026',
      status: 'approved',
      days_balance: 0,
      balances: [
        {
          currency_id: 'f0e1d2c3-b4a5-4697-8877-665544332211',
          pending: '12.0000',
          earned: '52.0000',
          payable: '30.0000',
          paid_out: '10.0000',
        },
      ],
      joined_at: '2026-10-08T09:05:00+00:00',
      approved_at: '2026-10-08T10:00:00+00:00',
      created_at: '2026-10-08T09:05:00+00:00',
      updated_at: '2026-10-08T10:00:00+00:00',
    },
  },
} satisfies Search;
