import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_coupon',
  noun: 'Coupon',
  display: {
    label: 'Get Coupon',
    description:
      'Retrieve one coupon by UUID, with its discount, limits, live redemption tally and sales window. "redemptions.remaining" already accounts for checkouts in flight, so prefer it over subtracting the count from the cap yourself.',
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
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const couponId = bundle.inputData.coupon_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/coupons/${couponId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: '4b9d3e08-a1f6-4275-9c83-7e01d6a2f594',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      code: 'BLACKFRIDAY',
      name: 'Black Friday 2026',
      discount: { type: 'percentage', value: '25.0000', currency_id: null, currency: null },
      duration: 'once',
      limits: { max_redemptions: 500, max_redemptions_per_user: 1, minimum_amount: null },
      redemptions: { count: 137, remaining: 363, exhausted: false },
      window: { starts_at: '2026-11-27T00:00:00+00:00', expires_at: '2026-12-01T00:00:00+00:00' },
      plan_ids: [],
      active: true,
      redeemable: true,
      created_at: '2026-11-20T09:14:02+00:00',
      updated_at: '2026-11-24T16:41:11+00:00',
    },
  },
} satisfies Search;
