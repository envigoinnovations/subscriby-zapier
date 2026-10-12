import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_retention_settings',
  noun: 'Retention Settings',
  display: {
    label: 'Update Retention Settings',
    description:
      "Change a project's Revenue Recovery settings: the grace window a failed renewal keeps access for, the daily digest, the cancellation question and the three offers the cancellation screen can make. Only the fields you fill in change; blank fields keep their value.",
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
        key: 'grace_days',
        label: 'Grace Days',
        type: 'integer',
        required: false,
        helpText: 'How many days a failed renewal keeps the member\'s access while the gateway retries, 0–30. 0 pauses access at the failure.',
      },
      {
        key: 'digest_enabled',
        label: 'Daily Digest',
        type: 'boolean',
        required: false,
        helpText: 'Whether the owner gets one message a day with the failures, reminders, pauses and recoveries, only on a day something happened.',
      },
      {
        key: 'cancel_feedback_enabled',
        label: 'Ask Why On Cancel',
        type: 'boolean',
        required: false,
        helpText: 'Whether the cancellation screen asks the member why before the offer. Off skips straight to the offer.',
      },
      {
        key: 'offer_pause_enabled',
        label: 'Offer A Pause',
        type: 'boolean',
        required: false,
        helpText: 'Whether a cancelling member whose gateway can hold the charge is offered one billing cycle on hold. Needs Growth or the Revenue Recovery Addon; stored either way.',
      },
      {
        key: 'offer_discount_coupon_id',
        label: 'Discount Coupon ID',
        type: 'string',
        required: false,
        helpText: 'One of the project\'s coupons, applied to a cancelling member\'s renewals where the gateway can carry it. Leave blank to keep the stored value; tick Clear Discount Coupon to remove it.',
      },
      {
        key: 'clear_discount_coupon',
        label: 'Clear Discount Coupon',
        type: 'boolean',
        required: false,
        helpText: 'Set true to remove the discount offer. A blank Discount Coupon ID alone keeps the stored value.',
      },
      {
        key: 'offer_return_coupon_id',
        label: 'Return Coupon ID',
        type: 'string',
        required: false,
        helpText: 'One of the project\'s coupons, handed to a cancelling member on the way out on every payment method. Leave blank to keep the stored value; tick Clear Return Coupon to remove it.',
      },
      {
        key: 'clear_return_coupon',
        label: 'Clear Return Coupon',
        type: 'boolean',
        required: false,
        helpText: 'Set true to remove the return coupon offer. A blank Return Coupon ID alone keeps the stored value.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const body: Record<string, unknown> = {};

      if (bundle.inputData.grace_days !== undefined && bundle.inputData.grace_days !== null && bundle.inputData.grace_days !== '') {
        body.grace_days = Number(bundle.inputData.grace_days);
      }

      for (const key of ['digest_enabled', 'cancel_feedback_enabled', 'offer_pause_enabled'] as const) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value === true || value === 'true';
        }
      }

      for (const key of ['offer_discount_coupon_id', 'offer_return_coupon_id'] as const) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value;
        }
      }

      if (bundle.inputData.clear_discount_coupon === true || bundle.inputData.clear_discount_coupon === 'true') {
        body.offer_discount_coupon_id = null;
      }

      if (bundle.inputData.clear_return_coupon === true || bundle.inputData.clear_return_coupon === 'true') {
        body.offer_return_coupon_id = null;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/retention`,
        method: 'PUT',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      grace_days: 10,
      ladder: "A failed renewal keeps the member's access for 10 days: they are told at once with a link to settle the payment, reminded on day 3 and the day before the window closes, and paused when it does; access comes back by itself with the next successful payment.",
      digest_enabled: true,
      cancel_feedback_enabled: true,
      offers_available: true,
      offer_pause_enabled: true,
      offer_discount_coupon: { id: '3b7c9d1e-5f24-4a86-9c0b-2d4e6f8a1b3c', code: 'STAY20' },
      offer_return_coupon: null,
      updated_at: '2026-10-12T09:00:00+00:00',
    },
  },
} satisfies Create;
