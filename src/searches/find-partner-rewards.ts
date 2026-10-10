import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_partner_rewards',
  noun: 'Partner Reward',
  display: {
    label: 'Find Partner Rewards',
    description:
      'List your Partner Program commission ledger, newest first: one "commission" row per paid invoice of a creator you referred, priced from the invoice\'s total before tax and after discount at the referral\'s locked rate, plus the "clawback" rows that answer a reversal of money already settled. Narrow by status: pending (inside the hold), approved (payable), credited (applied as Subscriby Credit), paid (covered by a cash payout) or reversed.',
  },
  operation: {
    inputFields: [
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: {
          pending: 'Pending — inside the hold',
          approved: 'Approved — payable',
          credited: 'Credited — applied as Subscriby Credit',
          paid: 'Paid — covered by a cash payout',
          reversed: 'Reversed',
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
        url: `${apiBaseUrl()}/me/partner/rewards`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '8e9f0a1b-2c3d-4e5f-8a9b-0c1d2e3f4a5b',
      referral_id: '3c4d5e6f-7081-4a2b-9c3d-4e5f6a7b8c9d',
      kind: 'commission',
      invoice_id: 'in_1QExampleInvoice00',
      base_amount: '31.2000',
      amount: '4.6800',
      currency: 'USD',
      status: 'approved',
      hold_until: '2026-11-08T14:20:00+00:00',
      approved_at: '2026-11-08T15:00:00+00:00',
      credited_at: null,
      paid_at: null,
      reversed_at: null,
      payout_id: null,
      reverses_reward_id: null,
      note: null,
      created_at: '2026-10-09T14:20:00+00:00',
    },
  },
} satisfies Search;
