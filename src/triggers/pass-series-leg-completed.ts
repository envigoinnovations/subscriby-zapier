import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_leg_completed',
  noun: 'Pass Series',
  label: 'Pass Series Pass Completed',
  description:
    "Triggers when one date of a holder's season finishes, carrying their running attendance. granted and joined are different questions: granted means access was issued, joined means they actually appeared. Fires per holder per date, so a ten-date season sold to forty people produces four hundred of these across its run.",
  event: 'pass_series.leg_completed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.leg_completed',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
          subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE0000',
          subscriber_id: 'usr_01HXSUBSCRIBERSAMPLE000000',
          plan_id: 'pln_01HXSERIESSAMPLE000000000',
          window_id: 'psw_01HXWINDOWSAMPLE00000000000',
          source_plan_id: 'pln_01HXPLANSAMPLE0000000000000',
          granted: true,
          joined: true,
          passes_total: 10,
          passes_attended: 4,
          passes_missed: 1,
          passes_remaining: 5
    },
  },
});
