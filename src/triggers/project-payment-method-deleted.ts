import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_payment_method_deleted',
  noun: 'Payment Method',
  label: 'Payment Method Deleted',
  description:
    'Triggers when a payment gateway is removed from a project. Buyers lose that way to pay at once, while subscriptions already sold through it keep their gateway for refunds and history. The snapshot carries no credentials.',
  event: 'project.payment_method.deleted',
  sample: {
    id: 'evt_01HXEXAMPLEPAYMETHOD0000002',
    type: 'project.payment_method.deleted',
    created_at: '2026-09-06T09:30:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      payment_method: {
        id: 'a15d70c8-3e46-4b92-b70f-58c9d2140e63',
        provider: 'paypal',
        mode: 'live',
        active: false,
      },
    },
  },
});
