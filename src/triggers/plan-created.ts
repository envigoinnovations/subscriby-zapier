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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      plan: {
        id: 'pln_01HXPLANSAMPLE0000000000000',
        name: 'Premium Monthly',
        price: '9.99',
        currency_id: 'cur_01HXCURRENCYSAMPLE00000000',
        billing_cycle: 'month',
        active: true,
      },
    },
  },
});
