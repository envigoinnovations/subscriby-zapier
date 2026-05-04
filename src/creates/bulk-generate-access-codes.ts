import { ZObject, Bundle, Create } from 'zapier-platform-core';
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
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: true, dynamic: 'dropdown_plans.id.name' },
      { key: 'quantity', label: 'Quantity', type: 'integer', required: true, helpText: '1-1000 codes per batch.' },
      {
        key: 'export_type',
        label: 'Export Type',
        type: 'string',
        required: true,
        choices: {
          file: 'File — CSV delivered to the creator\'s Telegram chat',
          messages: 'Messages — one Telegram message per code delivered to the creator\'s chat',
        },
        helpText: 'How the job delivers the generated codes to the creator. Both variants require the creator to have a Telegram chat linked to their MemberPass account.',
      },
      {
        key: 'expiry_preset',
        label: 'Expiry Preset',
        type: 'string',
        required: true,
        choices: {
          no_expiry: 'No expiry',
          '1_day': '1 day',
          '1_week': '1 week',
          '1_month': '1 month',
          '1_year': '1 year',
          custom: 'Custom',
        },
      },
      {
        key: 'custom_expiry_amount',
        label: 'Custom Expiry Amount',
        type: 'integer',
        required: false,
        helpText: 'Required when expiry_preset=custom. Minimum 1.',
      },
      {
        key: 'custom_expiry_type',
        label: 'Custom Expiry Type',
        type: 'string',
        required: false,
        choices: { days: 'Days', weeks: 'Weeks', months: 'Months', years: 'Years' },
        helpText: 'Required when expiry_preset=custom.',
      },
      {
        key: 'consent',
        label: 'Messages Consent',
        type: 'boolean',
        required: false,
        helpText: 'Required and must be true when export_type=messages — acknowledges that one Telegram message per code will be sent to the creator\'s chat (high-volume batches may hit Telegram rate limits).',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;

      const body: Record<string, unknown> = {
        quantity: bundle.inputData.quantity,
        export_type: bundle.inputData.export_type,
        expiry_preset: bundle.inputData.expiry_preset,
      };

      if (bundle.inputData.expiry_preset === 'custom') {
        body.custom_expiry_amount = bundle.inputData.custom_expiry_amount;
        body.custom_expiry_type = bundle.inputData.custom_expiry_type;
      }

      if (bundle.inputData.export_type === 'messages') {
        body.consent = bundle.inputData.consent === true;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}/access-codes/bulk-generate`,
        method: 'POST',
        body,
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
} satisfies Create;