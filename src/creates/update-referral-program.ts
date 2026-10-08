import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

/**
 * The nullable programme fields a Zap may explicitly unset. A blank Zapier
 * field is indistinguishable from an untouched one, so clearing has to be
 * asked for by name; each entry named is sent as null.
 */
const CLEARABLE_FIELDS = ['commission_period_months', 'minimum_payout', 'payout_details_label', 'terms'] as const;

const SAMPLE = {
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
};

export default {
  key: 'update_referral_program',
  noun: 'Referral Program',
  display: {
    label: 'Update Referral Program',
    description:
      'Set up or change a project\'s Referral Program. The first call on a project creates it; every later call changes only the fields you fill in, blank fields keep their value. Rewards already in the ledger keep their figures, and every approved or pending affiliate is told the new terms in their chat and by mail. Needs the Referral Program Addon or a Growth plan.',
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
        key: 'reward_kind',
        label: 'Reward Kind',
        type: 'string',
        required: false,
        choices: { free_days: 'Free membership days', cash: 'Cash commission you pay out' },
        helpText: 'What referrers earn per converted friend. A first save defaults to free days.',
      },
      { key: 'reward_days', label: 'Reward Days', type: 'integer', required: false, helpText: '1–3650 days per converted friend, for a free-days reward.' },
      {
        key: 'commission_type',
        label: 'Commission Type',
        type: 'string',
        required: false,
        choices: { percentage: 'Percentage of every settled payment', fixed: 'Fixed amount on the first payment' },
        helpText: 'For a cash reward.',
      },
      {
        key: 'commission_value',
        label: 'Commission Value',
        type: 'number',
        required: false,
        helpText: '0.0001–100 for a percentage, any amount above zero for a fixed commission.',
      },
      {
        key: 'commission_currency_id',
        label: 'Commission Currency ID',
        type: 'string',
        required: false,
        helpText: 'Currency row id a fixed commission is paid in. Cleared automatically for a percentage.',
      },
      {
        key: 'commission_period_months',
        label: 'Commission Period (Months)',
        type: 'integer',
        required: false,
        helpText: '0 for the friend\'s first payment only, 1–36 months. To make it run for life, use Unset Fields below.',
      },
      { key: 'hold_days', label: 'Hold Days', type: 'integer', required: false, helpText: '0–90 days a cash commission waits before it is payable, so a refund can take it back. Defaults to 14.' },
      { key: 'minimum_payout', label: 'Minimum Payout', type: 'number', required: false, helpText: 'A guide for you only: the balance an affiliate reaches before you pay. Nothing is enforced.' },
      {
        key: 'friend_reward_kind',
        label: 'Friend Reward Kind',
        type: 'string',
        required: false,
        choices: { none: 'Nothing', free_days: 'Free membership days on their first purchase', coupon: 'A coupon applied at their checkout' },
      },
      { key: 'friend_reward_days', label: 'Friend Reward Days', type: 'integer', required: false, helpText: '1–3650, for a free-days friend reward.' },
      {
        key: 'friend_coupon_id',
        label: 'Friend Coupon ID',
        type: 'string',
        required: false,
        helpText: 'One of the project\'s coupon codes, for a coupon friend reward. Needs coupon codes on the project owner\'s plan. Find it with Find Coupons.',
      },
      { key: 'customers_only', label: 'Customers Only', type: 'boolean', required: false, helpText: 'Only members with a live membership may join.' },
      { key: 'approval_required', label: 'Approval Required', type: 'boolean', required: false, helpText: 'You approve each affiliate before their code counts.' },
      { key: 'payout_details_label', label: 'Payout Details Label', type: 'string', required: false, helpText: 'The question affiliates answer so you can pay them, such as "PayPal email". At most 120 characters.' },
      { key: 'terms', label: 'Terms', type: 'text', required: false, helpText: 'Your own terms, shown to affiliates and referred friends. At most 5,000 characters.' },
      {
        key: 'plan_ids',
        label: 'Plan IDs',
        type: 'string',
        required: false,
        list: true,
        dynamic: 'dropdown_plans.id.name',
        helpText: 'Replaces the plans a conversion must be on to count. Leave empty to keep the current restriction; to count every plan use Count Every Plan.',
      },
      {
        key: 'count_every_plan',
        label: 'Count Every Plan',
        type: 'boolean',
        required: false,
        helpText: 'Removes the plan restriction so a conversion on any plan counts, including plans added later. Overrides Plan IDs.',
      },
      {
        key: 'clear',
        label: 'Unset Fields',
        type: 'string',
        required: false,
        list: true,
        choices: {
          commission_period_months: 'Commission Period — run for life',
          minimum_payout: 'Minimum Payout',
          payout_details_label: 'Payout Details Label',
          terms: 'Terms',
        },
        helpText: 'Fields to blank out. A blank input is treated as unchanged, so clearing a value has to be asked for here.',
      },
      {
        key: 'active',
        label: 'Active',
        type: 'boolean',
        required: false,
        helpText: 'Prefer Activate Referral Program / Deactivate Referral Program, which change only this.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {};

      const passthrough: Array<keyof typeof bundle.inputData> = [
        'reward_kind',
        'reward_days',
        'commission_type',
        'commission_value',
        'commission_currency_id',
        'commission_period_months',
        'hold_days',
        'minimum_payout',
        'friend_reward_kind',
        'friend_reward_days',
        'friend_coupon_id',
        'customers_only',
        'approval_required',
        'payout_details_label',
        'terms',
        'active',
      ];

      for (const key of passthrough) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key as string] = value;
        }
      }

      const planIds = Array.isArray(bundle.inputData.plan_ids)
        ? (bundle.inputData.plan_ids as unknown[]).filter((id) => id !== undefined && id !== null && id !== '')
        : [];

      if (bundle.inputData.count_every_plan) {
        body.plan_ids = [];
      } else if (planIds.length > 0) {
        body.plan_ids = planIds;
      }

      const clear = Array.isArray(bundle.inputData.clear) ? (bundle.inputData.clear as string[]) : [];

      for (const field of CLEARABLE_FIELDS) {
        if (clear.includes(field)) {
          body[field] = null;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/referral-program`,
        method: 'PUT',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: SAMPLE,
  },
} satisfies Create;
