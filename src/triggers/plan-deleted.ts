import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'plan_deleted',
  noun: 'Plan',
  label: 'Plan Deleted',
  description: 'Triggers when a plan is hard-deleted.',
  event: 'plan.deleted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'plan.deleted',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      plan: {
        id: 'pln_01HXPLANSAMPLE0000000000000',
        project_id: 'prj_01HXPROJECTSAMPLE000000000',
        name: 'Premium Monthly',
        active: false,
      },
    },
  },
});
