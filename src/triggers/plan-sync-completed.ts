import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'plan_sync_completed',
  noun: 'Plan',
  label: 'Plan Sync Completed',
  description:
    'Triggers when the background sync finishes reconciling a plan with its upstream payment provider (Stripe product / price, PayPal plan, etc.).',
  event: 'plan.sync_completed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'plan.sync_completed',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      plan: {
        id: 'pln_01HXPLANSAMPLE0000000000000',
        project_id: 'prj_01HXPROJECTSAMPLE000000000',
        name: 'Premium Monthly',
        active: true,
      },
    },
  },
});
