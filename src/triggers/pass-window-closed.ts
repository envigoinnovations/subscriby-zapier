import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_window_closed',
  noun: 'Pass Window',
  label: 'Pass Window Closed',
  description:
    'Triggers when a time-limited pass access window ends, its holders are removed and their passes end. Also fires for a window that never opened because the worker was unavailable for its whole span.',
  event: 'pass.window_closed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.window_closed',
    created_at: '2026-09-21T03:00:02Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      window_id: 'psw_01HXWINDOWSAMPLE00000000000',
      starts_at: '2026-09-20T13:00:00Z',
      ends_at: '2026-09-21T03:00:00Z',
      subscribers_affected: 47,
    },
  },
});
