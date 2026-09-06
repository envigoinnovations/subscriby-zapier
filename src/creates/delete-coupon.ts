import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'delete_coupon',
  noun: 'Coupon',
  display: {
    label: 'Delete Coupon',
    description:
      'Permanently delete a coupon and its redemption history. Refused (422) while any checkout has this code quoted to a payment provider — deactivate instead, which stops new redemptions and keeps the history.',
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
        helpText: 'UUID of the coupon to delete. Find it with Find Coupons.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const couponId = bundle.inputData.coupon_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/coupons/${couponId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { id: couponId, deleted: true };
    },
    sample: {
      id: '4b9d3e08-a1f6-4275-9c83-7e01d6a2f594',
      deleted: true,
    },
  },
} satisfies Create;
