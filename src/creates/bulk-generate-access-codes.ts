import { ZObject, Bundle } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'bulk_generate_access_codes',
  noun: 'Access Code Batch',
  display: {
    label: 'Bulk Generate Access Codes',
    description:
      'Queue a bulk access-code generation batch for a plan. Returns immediately with a preview of the worst-case overage ("if every code is redeemed, this is what it would bill"). Stripe metered overage fires on redemption, not generation.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true },
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: true },
      { key: 'quantity', label: 'Quantity', type: 'integer', required: true, helpText: '1-10000 codes per batch.' },
      {
        key: 'expiry_preset',
        label: 'Expiry Preset',
        type: 'string',
        choices: {
          no_expiry: 'No expiry',
          '1_day': '1 day',
          '1_week': '1 week',
          '1_month': '1 month',
          '1_year': '1 year',
        },
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}/access-codes/bulk-generate`,
        method: 'POST',
        body: {
          quantity: bundle.inputData.quantity,
          expiry_preset: bundle.inputData.expiry_preset ?? 'no_expiry',
          export_type: 'silent',
        },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      unique_key: 'user_plan_unique_key',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      quantity: 50,
      status: 'generation_queued',
      preview: {
        free_remaining: 3,
        chargeable_quantity: 47,
        cost: '1.41',
      },
    },
  },
};
