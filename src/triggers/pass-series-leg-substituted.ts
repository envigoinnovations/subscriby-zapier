import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_leg_substituted',
  noun: 'Pass Series',
  label: 'Pass Series Pass Substituted',
  description:
    "Triggers when a cancelled date in a season is replaced and one holder is moved onto the replacement. Their season carries on at the same length. was_queued tells you whether they had already tapped their invite link — if you message them yourself, match that split or you will ask half your audience to do something they have already done.",
  event: 'pass_series.leg_substituted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.leg_substituted',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
          subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE0000',
          subscriber_id: 'usr_01HXSUBSCRIBERSAMPLE000000',
          plan_id: 'pln_01HXPLANSAMPLE0000000000000',
          from_window_id: 'psw_01HXWINDOWSAMPLE00000000000',
          from_starts_at: '2026-10-25T18:00:00Z',
          from_ends_at: '2026-10-25T21:00:00Z',
          to_window_id: 'psw_01HXWINDOWREPLACEMENT00000',
          to_starts_at: '2026-11-01T18:00:00Z',
          to_ends_at: '2026-11-01T21:00:00Z',
          was_queued: true
    },
  },
});
