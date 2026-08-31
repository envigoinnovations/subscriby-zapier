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
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      plan: {
        id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
        name: 'Premium Monthly',
        price: '9.99',
        active: false,
      },
    },
  },
});
