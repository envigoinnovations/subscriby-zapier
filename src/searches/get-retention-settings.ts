import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_retention_settings',
  noun: 'Retention Settings',
  display: {
    label: 'Get Retention Settings',
    description:
      "Retrieve a project's Revenue Recovery settings: the grace window a failed renewal keeps access for (with the notice ladder in words), the daily digest, the cancellation question, the three offers the cancellation screen can make, the checkout window after which a checkout counts as stalled and the trial reminder before a cardless trial ends. The row is created with the defaults on the first read.",
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
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/retention`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      grace_days: 7,
      ladder: "A failed renewal keeps the member's access for 7 days: they are told at once with a link to settle the payment, reminded on day 3 and the day before the window closes, and paused when it does; access comes back by itself with the next successful payment.",
      digest_enabled: true,
      cancel_feedback_enabled: true,
      checkout_stall_hours: 1,
      trial_notice_days: 3,
      offers_available: true,
      offer_pause_enabled: true,
      offer_discount_coupon: { id: '3b7c9d1e-5f24-4a86-9c0b-2d4e6f8a1b3c', code: 'STAY20' },
      offer_return_coupon: null,
      updated_at: '2026-10-12T09:00:00+00:00',
    },
  },
} satisfies Search;
