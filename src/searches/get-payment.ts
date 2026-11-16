import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_payment',
  noun: 'Payment',
  display: {
    label: 'Get Payment',
    description:
      'Retrieve one payment by UUID: the amount in the currency it was paid in, the gateway with its mode and the references it gave, the fee Subscriby calculated, why it was billed, the member and the plan, and the gateway’s words when it failed. The same row Find Payments lists.',
  },
  operation: {
    inputFields: [
      {
        key: 'payment_id',
        label: 'Payment ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the payment. Find it with Find Payments, or read it off a Payment Succeeded, Payment Failed or Payment Refunded trigger.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const paymentId = bundle.inputData.payment_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/payments/${paymentId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: '8b0c4a15-e792-4360-95d8-1f47c0b3e926',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      plan_id: '2c1e7a9d-4b3f-4e8a-9c21-7d5e0b6a8f31',
      plan_name: 'Monthly Pass',
      subscriber_id: '9a3b2c1d-6e5f-4a7b-8c9d-0e1f2a3b4c5d',
      subscriber_name: 'Ada Lovelace',
      method_id: 'a15d70c8-3e46-4b92-b70f-58c9d2140e63',
      provider: 'stripe',
      provider_label: 'Stripe',
      mode: 'live',
      status: 'failed',
      status_label: 'Failed',
      amount: '29.0000',
      currency: 'USD',
      calculated_fee: '0.0000',
      billing_reason: 'subscription_cycle',
      external_payment_id: 'pi_3QX1Y2Z3A4B5C6D8',
      external_event_id: 'evt_1QX1Y2Z3A4B5C6D8',
      failure_reason: 'card_declined',
      occurred_at: '2026-11-16T08:12:00+00:00',
      created_at: '2026-11-16T08:12:03+00:00',
    },
  },
} satisfies Search;
