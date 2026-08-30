import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_holder_moved',
  noun: 'Pass Holder',
  label: 'Pass Holder Moved',
  description:
    'Triggers when a pass holder is moved off a cancelled access window onto the next available one on the same plan. Fires once per holder. They are not charged again. `was_queued` tells you whether they had already tapped their invite link — if true the move asks nothing of them, if false they still need to join the queue for the new date. Timestamps are UTC.',
  event: 'pass.holder_moved',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.holder_moved',
    created_at: '2026-09-18T09:14:22Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      subscriber_id: 'usr_01HXSUBSCRIBERSAMPLE0000000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      from_window_id: 'psw_01HXWINDOWSAMPLE00000000000',
      from_starts_at: '2026-09-20T13:00:00Z',
      from_ends_at: '2026-09-20T19:00:00Z',
      to_window_id: 'psw_01HYWINDOWSAMPLE00000000000',
      to_starts_at: '2026-09-27T13:00:00Z',
      to_ends_at: '2026-09-27T19:00:00Z',
      was_queued: true,
    },
  },
});
