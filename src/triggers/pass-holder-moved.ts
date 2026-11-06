import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_holder_moved',
  noun: 'Pass Holder',
  label: 'Pass Holder Moved',
  description:
    'Triggers when a pass holder is moved off a cancelled access window onto the next available one on the same plan. Fires once per holder. They are not charged again. `was_queued` tells you whether they had already tapped their invite link — if true the move asks nothing of them, if false they still need to join the queue for the new date. `reason` is `window_cancelled`, or `paid_after_window` when the payment settled after the window it was for and the pass was bound to the next date instead; `move_id` names the hop in the pass move log. Timestamps are UTC.',
  event: 'pass.holder_moved',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.holder_moved',
    created_at: '2026-09-18T09:14:22Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      subscriber_id: '6f9b2e37-c184-4a05-8d72-30e16bc9f458',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      from_window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
      from_starts_at: '2026-09-20T13:00:00Z',
      from_ends_at: '2026-09-20T19:00:00Z',
      to_window_id: 'psw_01HYWINDOWSAMPLE00000000000',
      to_starts_at: '2026-09-27T13:00:00Z',
      to_ends_at: '2026-09-27T19:00:00Z',
      was_queued: true,
      reason: 'window_cancelled',
      move_id: 'b7e1c3d9-5a24-4f60-8c17-2d9e4b6f0a35',
    },
  },
});
