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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      plan: {
        id: 'pln_01HXPLANSAMPLE0000000000000',
        name: 'Premium Monthly',
        price: '12.99',
        currency_id: 'cur_01HXCURRENCYSAMPLE00000000',
        billing_cycle: 'month',
        active: true,
      },
      changes: {
        price: { from: '9.99', to: '12.99' },
      },
    },
  },
});
