import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_window_scheduled',
  noun: 'Pass Window',
  label: 'Pass Window Scheduled',
  description:
    "Triggers when a new dated access window is created on a time-limited pass plan — generated from the plan's recurrence or placed by hand. This is the event that lets you mirror a schedule into a calendar or CRM without polling. Note that editing a schedule regenerates windows in bulk, so one plan save can fire this many times at once.",
  event: 'pass.window_scheduled',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.window_scheduled',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
          plan_id: 'pln_01HXPLANSAMPLE0000000000000',
          window_id: 'psw_01HXWINDOWSAMPLE00000000000',
          starts_at: '2026-09-20T13:00:00Z',
          ends_at: '2026-09-21T03:00:00Z',
          timezone: 'America/New_York',
          source: 'generated'
    },
  },
});
