import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'sync_payment_method_plans',
  noun: 'Payment Method',
  label: 'Sync Payment Method Plans',
  description:
    "Queue a push of the project's plans into a gateway's catalogue (Stripe products and prices, PayPal, Razorpay or CoinPayments plans). Answers sync_queued at once; the work runs in the background and each plan reports through the plan.sync_completed event. A gateway that keeps no catalogue (Telegram Stars, access codes, the redirect gateways) is refused.",
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'method_id', label: 'Method ID', type: 'string', required: true, helpText: 'UUID of the payment method; find it with List Payment Methods.' },
  ],
  path: (input) => `/projects/${input.project_id}/payment-methods/${input.method_id}/sync`,
  sample: { payment_method_id: 'a15d70c8-3e46-4b92-b70f-58c9d2140e63', status: 'sync_queued' },
});
