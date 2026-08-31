import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'plan_created',
  noun: 'Plan',
  label: 'New Plan',
  description:
    'Triggers when a creator publishes a new subscription plan. Use to notify internal teams, mirror plans into an external catalog, or alert ops on new pricing.',
  event: 'plan.created',
  sample: {
    id: 'evt_01HXEXAMPLEFFFFFFFFFFFFFFF',
    type: 'plan.created',
    created_at: '2026-05-18T09:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      plan: {
        id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
        name: 'Premium Monthly',
        price: '9.99',
        currency_id: '8f27a0d4-63be-4915-8c07-1a5d9e34b628',
        billing_cycle: 'month',
        active: true,
      },
    },
  },
});
