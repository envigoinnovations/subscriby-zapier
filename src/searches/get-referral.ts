import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_referral',
  noun: 'Referral',
  display: {
    label: 'Get Referral',
    description:
      'Retrieve one referral by UUID: the affiliate, the friend\'s member id, how they arrived, whether their first payment settled and "commission_ends_at", the instant the affiliate stops earning on them on a programme with a period.',
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
        key: 'referral_id',
        label: 'Referral ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the referral. Find it with Find Referrals, or read it off New Referral.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const referralId = bundle.inputData.referral_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/referrals/${referralId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: '3c4d5e6f-7081-4a2b-9c3d-4e5f6a7b8c9d',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      program_id: '6e2a7a4f-3b8c-4c21-9f6d-2a3b4c5d6e7f',
      affiliate_id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      member_id: 'b2c3d4e5-f6a7-4819-9b0c-1d2e3f4a5b6c',
      source: 'portal_link',
      connector: null,
      status: 'touched',
      touched_at: '2026-10-08T11:00:00+00:00',
      expires_at: '2026-11-07T11:00:00+00:00',
      converted_at: null,
      converted_subscription_id: null,
      commission_ends_at: null,
      created_at: '2026-10-08T11:00:00+00:00',
    },
  },
} satisfies Search;
