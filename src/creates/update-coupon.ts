import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

/**
 * The nullable coupon fields a Zap may explicitly unset. A blank Zapier field
 * is indistinguishable from an untouched one, so clearing has to be asked for
 * by name; each entry named is sent as null.
 */
const CLEARABLE_FIELDS = ['max_redemptions', 'minimum_amount', 'starts_at', 'expires_at'] as const;

export default {
  key: 'update_coupon',
  noun: 'Coupon',
  display: {
    label: 'Update Coupon',
    description:
      'Partial-update a coupon. Only the fields you fill in change; blank fields keep their value. Changes are not retroactive — subscribers who already redeemed keep what they paid. Raising the cap on an exhausted code makes it redeemable again; lowering it below the count claws nothing back.',
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
        key: 'coupon_id',
        label: 'Coupon ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the coupon. Find it with Find Coupons.',
      },
      {
        key: 'code',
        label: 'Code',
        type: 'string',
        required: false,
        helpText:
          '3–64 characters: letters, numbers and dashes. Uppercased before the uniqueness check, so a lowercase spelling of an existing code is refused as a duplicate.',
      },
      { key: 'name', label: 'Name', type: 'string', required: false, helpText: '3–255 characters. Never shown to subscribers.' },
      {
        key: 'discount_type',
        label: 'Discount Type',
        type: 'string',
        required: false,
        choices: { percentage: 'Percentage off', fixed: 'Fixed amount off' },
        helpText: 'Switching to Fixed requires a Currency ID unless the coupon already has one.',
      },
      {
        key: 'discount_value',
        label: 'Discount Value',
        type: 'number',
        required: false,
        helpText: 'Greater than 0. Capped at 100 while the coupon is (or becomes) a percentage.',
      },
      {
        key: 'currency_id',
        label: 'Currency ID',
        type: 'string',
        required: false,
        helpText: 'Currency row id for a fixed discount; must match the currency of the plans it applies to.',
      },
      {
        key: 'max_redemptions',
        label: 'Redemption Cap',
        type: 'integer',
        required: false,
        helpText: '1–1,000,000. To make the code unlimited again, use Unset Fields below.',
      },
      { key: 'max_redemptions_per_user', label: 'Redemptions Per Subscriber', type: 'integer', required: false, helpText: '1–1000.' },
      { key: 'minimum_amount', label: 'Minimum Order Amount', type: 'number', required: false, helpText: 'In the plan’s own currency.' },
      { key: 'starts_at', label: 'Starts At', type: 'datetime', required: false },
      {
        key: 'expires_at',
        label: 'Expires At',
        type: 'datetime',
        required: false,
        helpText: 'Checked against the stored Starts At when only one end of the window moves.',
      },
      {
        key: 'plan_ids',
        label: 'Plan IDs',
        type: 'string',
        required: false,
        list: true,
        dynamic: 'dropdown_plans.id.name',
        helpText:
          'Replaces the restriction with these plans. Leave empty to keep the current restriction; to open the code to every plan use Apply To Every Plan.',
      },
      {
        key: 'apply_to_every_plan',
        label: 'Apply To Every Plan',
        type: 'boolean',
        required: false,
        helpText:
          'Removes the plan restriction so the code applies to every plan in the project, including plans added later. Overrides Plan IDs.',
      },
      {
        key: 'clear',
        label: 'Unset Fields',
        type: 'string',
        required: false,
        list: true,
        choices: {
          max_redemptions: 'Redemption Cap — make unlimited',
          minimum_amount: 'Minimum Order Amount',
          starts_at: 'Starts At',
          expires_at: 'Expires At',
        },
        helpText: 'Fields to blank out. A blank input is treated as unchanged, so clearing a value has to be asked for here.',
      },
      {
        key: 'active',
        label: 'Active',
        type: 'boolean',
        required: false,
        helpText: 'Prefer Activate Coupon / Deactivate Coupon, which raise their own events.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const couponId = bundle.inputData.coupon_id as string;

      const body: Record<string, unknown> = {};

      const passthrough: Array<keyof typeof bundle.inputData> = [
        'code',
        'name',
        'discount_type',
        'discount_value',
        'currency_id',
        'max_redemptions',
        'max_redemptions_per_user',
        'minimum_amount',
        'starts_at',
        'expires_at',
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

      if (bundle.inputData.apply_to_every_plan) {
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
        url: `${apiBaseUrl()}/projects/${projectId}/coupons/${couponId}`,
        method: 'PATCH',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '4b9d3e08-a1f6-4275-9c83-7e01d6a2f594',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      code: 'BLACKFRIDAY',
      name: 'Black Friday 2026',
      discount: { type: 'percentage', value: '30.0000', currency_id: null, currency: null },
      duration: 'once',
      limits: { max_redemptions: 750, max_redemptions_per_user: 1, minimum_amount: null },
      redemptions: { count: 137, remaining: 613, exhausted: false },
      window: { starts_at: '2026-11-27T00:00:00+00:00', expires_at: '2026-12-01T00:00:00+00:00' },
      plan_ids: [],
      active: true,
      redeemable: true,
      created_at: '2026-11-20T09:14:02+00:00',
      updated_at: '2026-11-24T16:41:11+00:00',
    },
  },
} satisfies Create;
