import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_presale_opened',
  noun: 'Pass Series',
  label: 'Pass Series Presale Opened',
  description:
    "Triggers when a finished season's holders are given first refusal on the next one. Until closes_at, nobody who did not hold the finished season can buy the successor. Who is invited is worked out at this moment rather than at checkout, which is what lets a creator link a next season months after the last one sold out and still reach everyone.",
  event: 'pass_series.presale_opened',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.presale_opened',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
          plan_id: 'pln_01HXSERIESSAMPLE000000000',
          plan_name: 'Autumn Season Ticket',
          successor_plan_id: 'pln_01HXNEXTSEASON00000000000',
          eligible_holders: 38,
          presale_hours: 48,
          closes_at: '2026-12-01T21:00:11Z'
    },
  },
});
