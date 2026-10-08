import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_referral_program',
  noun: 'Referral Program',
  display: {
    label: 'Get Referral Program',
    description:
      'Retrieve a project\'s Referral Program: what referrers earn, what their friends receive, who may join, the hold before a commission is payable and the plans a conversion counts on. Returns no rows while the project has no programme. "plan_ids" empty means every plan, not no plans.',
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
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/referral-program`,
        skipThrowForStatus: true,
      });

      if (response.status === 404) {
        return [];
      }

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: '6e2a7a4f-3b8c-4c21-9f6d-2a3b4c5d6e7f',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      active: true,
      customers_only: false,
      approval_required: false,
      reward_kind: 'cash',
      reward_days: null,
      commission_type: 'percentage',
      commission_value: '20.0000',
      commission_currency_id: null,
      commission_currency: null,
      commission_period_months: 6,
      hold_days: 14,
      minimum_payout: '50.0000',
      friend_reward_kind: 'free_days',
      friend_reward_days: 3,
      friend_coupon_id: null,
      payout_details_label: 'PayPal email',
      terms: 'One referral per household.',
      plan_ids: [],
      created_at: '2026-10-01T09:14:02+00:00',
      updated_at: '2026-10-08T16:41:11+00:00',
    },
  },
} satisfies Search;
