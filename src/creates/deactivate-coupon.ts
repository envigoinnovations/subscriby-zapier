import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'deactivate_coupon',
  noun: 'Coupon',
  display: {
    label: 'Deactivate Coupon',
    description:
      'Switch a coupon off. The safe way to retire a code: new redemptions stop immediately and every redemption already recorded is kept. A checkout already in flight still completes, so expect a late Coupon Redeemed shortly after. Raises Coupon Deactivated.',
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
        url: `${apiBaseUrl()}/projects/${projectId}/coupons/${couponId}/deactivate`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '4b9d3e08-a1f6-4275-9c83-7e01d6a2f594',
      code: 'BLACKFRIDAY',
      active: false,
      redeemable: false,
    },
  },
} satisfies Create;
