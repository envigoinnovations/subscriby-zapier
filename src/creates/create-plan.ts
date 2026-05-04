import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_plan',
  noun: 'Plan',
  display: {
    label: 'Create Plan',
    description:
      'Create a new subscription plan on a MemberPass project. Currency must be supported by an active payment method on the project; crypto/platform currencies reject recurring=true; at least one project_resource UUID must be linked.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'name', label: 'Name', type: 'string', required: true, helpText: '5-255 chars; unique per project.' },
      { key: 'currency_id', label: 'Currency ID', type: 'string', required: true, helpText: 'UUID from /v1/currencies. Must be supported by an active payment method on the project.' },
      { key: 'price', label: 'Price', type: 'number', required: true, helpText: 'Decimal, min 0.' },
      {
        key: 'billing_cycle',
        label: 'Billing Cycle',
        type: 'string',
        required: true,
        choices: { day: 'Day', week: 'Week', month: 'Month', year: 'Year', lifetime: 'Lifetime' },
      },
      {
        key: 'billing_cycle_count',
        label: 'Cycle Count',
        type: 'integer',
        required: true,
        default: '1',
        helpText: '1-99. Must be 1 when billing_cycle=lifetime.',
      },
      {
        key: 'resources',
        label: 'Resource IDs',
        type: 'string',
        list: true,
        required: true,
        helpText: 'One or more project_resource UUIDs. A plan with no linked resource cannot be redeemed.',
      },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'Max 1000 chars; HTML is filtered server-side.' },
      { key: 'trial_days', label: 'Trial Days', type: 'integer', required: false, helpText: '0-365.' },
      { key: 'trial_cardless', label: 'Cardless Trial', type: 'boolean', required: false, helpText: 'Let subscribers start a trial without a payment method on file.' },
      {
        key: 'newcomers_only',
        label: 'Newcomers Only',
        type: 'boolean',
        required: false,
        helpText: 'Only users with no prior subscription on this project can purchase. Mutually exclusive with customers_only and churned_only.',
      },
      {
        key: 'customers_only',
        label: 'Customers Only',
        type: 'boolean',
        required: false,
        helpText: 'Only users with at least one prior subscription on this project can purchase. Mutually exclusive with newcomers_only and churned_only.',
      },
      {
        key: 'churned_only',
        label: 'Churned Only',
        type: 'boolean',
        required: false,
        helpText: 'Only users whose last subscription has ended can purchase. Mutually exclusive with newcomers_only and customers_only.',
      },
      {
        key: 'recurring',
        label: 'Recurring',
        type: 'boolean',
        required: false,
        helpText: 'Defaults to true. Crypto / platform currencies require recurring=false.',
      },
      { key: 'single_use', label: 'Single-Use Purchase', type: 'boolean', required: false, helpText: 'Subscribers can only purchase this plan once.' },
      { key: 'access_codes_only', label: 'Access Codes Only', type: 'boolean', required: false, helpText: 'Plan can only be redeemed via an access code.' },
      { key: 'active', label: 'Active', type: 'boolean', required: false, helpText: 'Defaults to true. Set false to create as draft.' },
      { key: 'disabled_renewal', label: 'Disabled Renewal', type: 'boolean', required: false, helpText: 'Let subscribers use the plan once but not auto-renew.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {
        name: bundle.inputData.name,
        currency_id: bundle.inputData.currency_id,
        price: bundle.inputData.price,
        billing_cycle: bundle.inputData.billing_cycle,
        billing_cycle_count: bundle.inputData.billing_cycle_count ?? 1,
        resources: bundle.inputData.resources,
      };

      const passthrough: Array<keyof typeof bundle.inputData> = [
        'description',
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
      ];

      for (const key of passthrough) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key as string] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans`,
        method: 'POST',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: 'pln_01HXPLANSAMPLE0000000000000',
      name: 'Premium Monthly',
      price: '29.00',
      billing_cycle: 'month',
      billing_cycle_count: 1,
      active: true,
    },
  },
} satisfies Create;