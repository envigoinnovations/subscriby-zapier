import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_partner_payouts',
  noun: 'Partner Payout',
  display: {
    label: 'Find Partner Payouts',
    description:
      'List the cash payouts Subscriby made to you as a partner, newest first: the amount, the rail it went by, the transfer\'s reference, when it left and how many commissions it covered. Commissions settled as Subscriby Credit are not payouts; find them with Find Partner Rewards as "credited".',
  },
  operation: {
    inputFields: [
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

      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/me/partner/payouts`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      amount: '117.0000',
      currency: 'USD',
      method: 'paypal',
      reference: 'PAYPAL-7F3D1C92',
      note: null,
      paid_at: '2026-11-01T06:30:00+00:00',
      rewards_paid: 10,
      created_at: '2026-11-01T06:30:00+00:00',
    },
  },
} satisfies Search;
