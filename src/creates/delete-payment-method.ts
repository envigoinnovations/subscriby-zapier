import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'delete_payment_method',
  noun: 'Payment Method',
  label: 'Delete Payment Method',
  description:
    'Remove a payment gateway from a project. Buyers lose that way to pay at once; subscriptions already sold through it keep their gateway for refunds and history, and configuring the same gateway again later revives the row.',
  method: 'DELETE',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'method_id', label: 'Method ID', type: 'string', required: true, helpText: 'UUID of the payment method to remove.' },
  ],
  path: (input) => `/projects/${input.project_id}/payment-methods/${input.method_id}`,
  emptyResult: (input) => ({ id: input.method_id, deleted: true }),
  sample: { id: 'a15d70c8-3e46-4b92-b70f-58c9d2140e63', deleted: true },
});
