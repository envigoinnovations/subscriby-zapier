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
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
          plan_id: 'e07b4a29-51c6-4d83-9f10-2b8ac635d174',
          plan_name: 'Autumn Season Ticket',
          successor_plan_id: '1d6c93f8-a204-4e71-b58c-7f03e2a91d46',
          eligible_holders: 38,
          presale_hours: 48,
          closes_at: '2026-12-01T21:00:11Z'
    },
  },
});
