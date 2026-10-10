import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';
import { PARTNER_REFERRAL_SAMPLE } from '../utils/partner-sample';

export default {
  key: 'find_partner_referrals',
  noun: 'Partner Referral',
  display: {
    label: 'Find Partner Referrals',
    description:
      'List the creators you brought to Subscriby as a partner, newest first: each named by display name alone, how they arrived, whether their first paid invoice converted them, the plan they converted on, the rate locked onto them and until when you earn on them. Narrow by status.',
  },
  operation: {
    inputFields: [
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: {
          signed_up: 'Signed up — inside the conversion window, no paid plan yet',
          converted: 'Converted — first paid invoice settled, earning',
          under_review: 'Under review — held by Subscriby for a fraud signal',
          expired: 'Expired — the window passed unpaid',
          rejected: 'Rejected after review',
        },
        helpText: 'Leave blank for every status.',
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
      const params: Record<string, unknown> = {};

      if (bundle.inputData.status) params.status = bundle.inputData.status;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/me/partner/referrals`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: PARTNER_REFERRAL_SAMPLE,
  },
} satisfies Search;
