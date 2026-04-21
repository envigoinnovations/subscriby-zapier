import { ZObject, Bundle } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'bulk_generate_access_codes',
  noun: 'Access Code Batch',
  display: {
    label: 'Bulk Generate Access Codes',
    description:
      'Queue a bulk access-code generation batch for a plan. BILLING WARNING: quantities beyond the creator tier free allotment are metered on Stripe. Set acknowledge_overage=true only after a human reviews the preview call.',
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
      {
        key: 'acknowledge_overage',
        label: 'Acknowledge Overage',
        type: 'boolean',
        helpText:
          'REQUIRED when the batch exceeds the creator tier free allotment. Run the preview helper first and confirm the dollar figure with your finance lead before toggling this on.',
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
          acknowledge_overage: bundle.inputData.acknowledge_overage ?? false,
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
