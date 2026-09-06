import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'deactivate_payment_method',
  noun: 'Payment Method',
  label: 'Deactivate Payment Method',
  description:
    'Stop offering a payment gateway to new buyers; subscriptions already sold through it keep renewing. The plan sync for the gateway is re-queued. Deactivating a method that is already off changes nothing.',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'method_id', label: 'Method ID', type: 'string', required: true, helpText: 'UUID of the payment method; find it with List Payment Methods.' },
  ],
  path: (input) => `/projects/${input.project_id}/payment-methods/${input.method_id}/deactivate`,
  sample: {
    id: 'a15d70c8-3e46-4b92-b70f-58c9d2140e63',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    provider: 'paypal',
    mode: 'live',
    linked: true,
    active: false,
    created_at: '2026-05-18T10:05:00Z',
    updated_at: '2026-09-06T09:20:00Z',
  },
});
