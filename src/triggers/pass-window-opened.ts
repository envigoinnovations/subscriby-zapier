import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_window_opened',
  noun: 'Pass Window',
  label: 'Pass Window Opened',
  description:
    'Triggers when a time-limited pass access window starts and everyone holding it is admitted to the linked Telegram resources. Timestamps are UTC — convert to the plan schedule timezone before displaying them.',
  event: 'pass.window_opened',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.window_opened',
    created_at: '2026-09-20T13:00:04Z',
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
