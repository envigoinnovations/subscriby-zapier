import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'copilot_credits_low',
  noun: 'Copilot Credits',
  label: 'Copilot Credits Low',
  description:
    'Triggers when a unit of Copilot usage leaves your Copilot Credits under the low-balance threshold, once a day at most: "balance_cents" is the whole balance at that moment and "threshold_cents" the line it fell under. The free monthly allowance draws nothing and never fires this. Use to buy a pack or to tell the person who manages billing.',
  event: 'copilot_credits.low',
  sample: {
    id: 'evt_01HXEXAMPLECOPILOT0000003',
    type: 'copilot_credits.low',
    created_at: '2026-11-02T09:14:31Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      balance_cents: 420,
      threshold_cents: 500,
    },
  },
});
