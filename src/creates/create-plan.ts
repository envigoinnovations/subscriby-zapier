import { ZObject, Bundle } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_plan',
  noun: 'Plan',
  display: {
    label: 'Create Plan',
    description:
      'Create a new subscription plan on a MemberPass project. Currency must be supported by an active payment method on the project.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true },
      { key: 'name', label: 'Name', type: 'string', required: true, helpText: '5-255 chars; unique per project.' },
      { key: 'currency_id', label: 'Currency ID', type: 'string', required: true },
      { key: 'price', label: 'Price', type: 'number', required: true },
      {
        key: 'billing_cycle',
        label: 'Billing Cycle',
        type: 'string',
        required: true,
        choices: { day: 'Day', week: 'Week', month: 'Month', year: 'Year', lifetime: 'Lifetime' },
      },
      { key: 'billing_cycle_count', label: 'Cycle Count', type: 'integer', required: true, default: '1' },
      { key: 'trial_days', label: 'Trial Days', type: 'integer', required: false },
      { key: 'description', label: 'Description', type: 'text', required: false },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans`,
        method: 'POST',
        body: {
          name: bundle.inputData.name,
          currency_id: bundle.inputData.currency_id,
          price: bundle.inputData.price,
          billing_cycle: bundle.inputData.billing_cycle,
          billing_cycle_count: bundle.inputData.billing_cycle_count ?? 1,
          trial_days: bundle.inputData.trial_days ?? 0,
          description: bundle.inputData.description ?? null,
        },
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
    },
  },
};
