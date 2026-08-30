import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_completed',
  noun: 'Pass Series',
  label: 'Pass Series Completed',
  description:
    "Triggers when a holder reaches the last date of their season, with the final attendance tallies. This is the renewal signal: eight of ten attended is a very different customer from two of ten. Fires per holder, not per series — two people holding the same season reach its end on different dates when one bought in late.",
  event: 'pass_series.completed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.completed',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
          subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE0000',
          subscriber_id: 'usr_01HXSUBSCRIBERSAMPLE000000',
          plan_id: 'pln_01HXSERIESSAMPLE000000000',
          plan_name: 'Autumn Season Ticket',
          passes_total: 10,
          passes_attended: 8,
          passes_missed: 2,
          successor_plan_id: 'pln_01HXNEXTSEASON00000000000'
    },
  },
});
