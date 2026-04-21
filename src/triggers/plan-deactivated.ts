import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'plan_deactivated',
  noun: 'Plan',
  label: 'Plan Deactivated',
  description:
    'Triggers when a plan is unpublished (disabled for new sign-ups). Existing subscribers continue on the plan; only new sign-ups are blocked.',
  event: 'plan.deactivated',
  sample: {
    id: 'evt_01HXEXAMPLEHHHHHHHHHHHHHHH',
    type: 'plan.deactivated',
    created_at: '2026-05-18T09:45:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      plan: {
        id: 'pln_01HXPLANSAMPLE0000000000000',
        name: 'Premium Monthly',
        price: '9.99',
        active: false,
      },
    },
  },
});
