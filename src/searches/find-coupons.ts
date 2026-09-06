import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_coupons',
  noun: 'Coupon',
  display: {
    label: 'Find Coupons',
    description:
      'List a project’s coupons, newest first, optionally narrowed to one exact code or to the on/off switch. Read "redeemable" on each row for whether a code actually applies right now — "active" is only the switch.',
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
        required: false,
        helpText: 'Exact code to look up. Case does not matter — codes are stored uppercase.',
      },
      {
        key: 'active',
        label: 'Active',
        type: 'boolean',
        required: false,
        helpText: 'Filter on the creator’s on/off switch only. Leave blank for both.',
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
      const projectId = bundle.inputData.project_id as string;
      const params: Record<string, unknown> = {};

      if (bundle.inputData.code) params.code = String(bundle.inputData.code).toUpperCase();
      if (bundle.inputData.active !== undefined && bundle.inputData.active !== null && bundle.inputData.active !== '') {
        params.active = bundle.inputData.active;
      }
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/coupons`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '4b9d3e08-a1f6-4275-9c83-7e01d6a2f594',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      code: 'BLACKFRIDAY',
      name: 'Black Friday 2026',
      discount: { type: 'percentage', value: '25.0000', currency_id: null },
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
