import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_plan',
  noun: 'Plan',
  display: {
    label: 'Update Plan',
    description:
      'Partial-update an existing plan. Lifetime count=1, mutually-exclusive eligibility flags, recurring-vs-crypto, and currency support checks all run server-side.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true },
      { key: 'plan_id', label: 'Plan ID', type: 'string', required: true },
      { key: 'name', label: 'Name', type: 'string', required: false, helpText: '5-255 chars; unique per project.' },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'Max 1000 chars; HTML filtered server-side.' },
      { key: 'currency_id', label: 'Currency ID', type: 'string', required: false },
      { key: 'price', label: 'Price', type: 'number', required: false },
      {
        key: 'billing_cycle',
        label: 'Billing Cycle',
        type: 'string',
        required: false,
        choices: { day: 'Day', week: 'Week', month: 'Month', year: 'Year', lifetime: 'Lifetime' },
      },
      { key: 'billing_cycle_count', label: 'Cycle Count', type: 'integer', required: false, helpText: '1-99. Must be 1 when billing_cycle=lifetime.' },
      { key: 'trial_days', label: 'Trial Days', type: 'integer', required: false, helpText: '0-365.' },
      { key: 'trial_cardless', label: 'Cardless Trial', type: 'boolean', required: false },
      { key: 'newcomers_only', label: 'Newcomers Only', type: 'boolean', required: false, helpText: 'Mutually exclusive with customers_only / churned_only.' },
      { key: 'customers_only', label: 'Customers Only', type: 'boolean', required: false },
      { key: 'churned_only', label: 'Churned Only', type: 'boolean', required: false },
      { key: 'recurring', label: 'Recurring', type: 'boolean', required: false, helpText: 'Crypto / platform currencies reject recurring=true.' },
      { key: 'single_use', label: 'Single-Use Purchase', type: 'boolean', required: false },
      { key: 'access_codes_only', label: 'Access Codes Only', type: 'boolean', required: false },
      { key: 'active', label: 'Active', type: 'boolean', required: false },
      { key: 'disabled_renewal', label: 'Disabled Renewal', type: 'boolean', required: false },
      { key: 'resources', label: 'Resource IDs', type: 'string', list: true, required: false, helpText: 'Replace the linked resource set. Must include at least one.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const planId = bundle.inputData.plan_id as string;

      const body: Record<string, unknown> = {};
      const passthrough: Array<keyof typeof bundle.inputData> = [
        'name',
        'description',
        'currency_id',
        'price',
        'billing_cycle',
        'billing_cycle_count',
        'trial_days',
        'trial_cardless',
        'newcomers_only',
        'customers_only',
        'churned_only',
        'recurring',
        'single_use',
        'access_codes_only',
        'active',
        'disabled_renewal',
        'resources',
      ];

      for (const key of passthrough) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key as string] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans/${planId}`,
        method: 'PATCH',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: 'pln_01HXPLANSAMPLE0000000000000',
      name: 'Premium Monthly',
      price: '12.99',
      billing_cycle: 'month',
      active: true,
    },
  },
} satisfies Create;