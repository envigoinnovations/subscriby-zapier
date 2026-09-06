import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_coupon',
  noun: 'Coupon',
  display: {
    label: 'Create Coupon',
    description:
      'Issue a discount code on a project. A coupon is one code any number of subscribers can redeem for money off at checkout — not an access code, which is one code for one person and grants access outright. The discount applies to the first payment only. Requires the Coupons Addon or a Growth plan.',
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
        key: 'code',
        label: 'Code',
        type: 'string',
        required: true,
        helpText:
          '3–64 characters: letters, numbers and dashes only. Stored and matched UPPERCASE, so "blackfriday" and "BLACKFRIDAY" are the same code and the second is refused as a duplicate. Unique per project.',
      },
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        required: true,
        helpText: '3–255 characters. For your own records — subscribers never see it.',
      },
      {
        key: 'discount_type',
        label: 'Discount Type',
        type: 'string',
        required: true,
        choices: { percentage: 'Percentage off', fixed: 'Fixed amount off' },
        helpText:
          'Percentage applies to a plan in any currency. Fixed takes an amount in one currency and applies only to plans priced in that currency.',
      },
      {
        key: 'discount_value',
        label: 'Discount Value',
        type: 'number',
        required: true,
        helpText:
          'Greater than 0. For a percentage coupon, 100 at most — 25 means 25% off. For a fixed coupon, the amount in the coupon currency.',
      },
      {
        key: 'currency_id',
        label: 'Currency ID',
        type: 'string',
        required: false,
        helpText:
          'Required for a fixed discount and refused on a percentage one. The currency row id, which must match the currency of the plans the coupon applies to — read it from a plan via Find Plan by ID (currency.id).',
      },
      {
        key: 'max_redemptions',
        label: 'Redemption Cap',
        type: 'integer',
        required: false,
        helpText:
          'Total redemptions across everyone, 1–1,000,000. Leave blank for unlimited. Coupon Exhausted fires when the last one is claimed.',
      },
      {
        key: 'max_redemptions_per_user',
        label: 'Redemptions Per Subscriber',
        type: 'integer',
        required: false,
        helpText: '1–1000. Defaults to 1.',
      },
      {
        key: 'minimum_amount',
        label: 'Minimum Order Amount',
        type: 'number',
        required: false,
        helpText: 'Order floor before the code applies, in the plan’s own currency.',
      },
      {
        key: 'starts_at',
        label: 'Starts At',
        type: 'datetime',
        required: false,
        helpText: 'The code cannot be redeemed before this moment. Leave blank to start immediately.',
      },
      {
        key: 'expires_at',
        label: 'Expires At',
        type: 'datetime',
        required: false,
        helpText: 'Must be after Starts At. Leave blank for no end date.',
      },
      {
        key: 'plan_ids',
        label: 'Plan IDs',
        type: 'string',
        required: false,
        list: true,
        dynamic: 'dropdown_plans.id.name',
        helpText:
          'Restrict the code to these plans. Leave empty and the coupon applies to EVERY plan in the project, including plans added later — an empty list never means "no plans".',
      },
      {
        key: 'active',
        label: 'Active',
        type: 'boolean',
        required: false,
        helpText: 'Defaults to true. Set false to create the code switched off and activate it later.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {
        code: bundle.inputData.code,
        name: bundle.inputData.name,
        discount_type: bundle.inputData.discount_type,
        discount_value: bundle.inputData.discount_value,
      };

      const passthrough: Array<keyof typeof bundle.inputData> = [
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

      if (planIds.length > 0) {
        body.plan_ids = planIds;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/coupons`,
        method: 'POST',
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
      discount: { type: 'percentage', value: '25.0000', currency_id: null, currency: null },
      duration: 'once',
      limits: { max_redemptions: 500, max_redemptions_per_user: 1, minimum_amount: null },
      redemptions: { count: 0, remaining: 500, exhausted: false },
      window: { starts_at: '2026-11-27T00:00:00+00:00', expires_at: '2026-12-01T00:00:00+00:00' },
      plan_ids: [],
      active: true,
      redeemable: false,
      created_at: '2026-11-20T09:14:02+00:00',
      updated_at: '2026-11-20T09:14:02+00:00',
    },
  },
} satisfies Create;
