import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'plan_activated',
  noun: 'Plan',
  label: 'Plan Activated',
  description:
    'Triggers when a plan is published / re-enabled and starts accepting subscribers.',
  event: 'plan.activated',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'plan.activated',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      plan: {
        id: 'pln_01HXPLANSAMPLE0000000000000',
        name: 'Premium Monthly',
        price: '9.99',
        active: true,
      },
    },
  },
});
