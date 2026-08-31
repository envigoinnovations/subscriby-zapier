import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'plan_updated',
  noun: 'Plan',
  label: 'Plan Updated',
  description:
    'Triggers when a plan\'s price, name, or terms are changed. Use for price-change alerts, external catalog sync, or audit trails.',
  event: 'plan.updated',
  sample: {
    id: 'evt_01HXEXAMPLE0000GGGGGGGGGGG',
    type: 'plan.updated',
    created_at: '2026-05-18T09:30:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      plan: {
        id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
        name: 'Premium Monthly',
        price: '12.99',
        currency_id: '8f27a0d4-63be-4915-8c07-1a5d9e34b628',
        billing_cycle: 'month',
        active: true,
      },
      changes: {
        price: { from: '9.99', to: '12.99' },
      },
    },
  },
});
