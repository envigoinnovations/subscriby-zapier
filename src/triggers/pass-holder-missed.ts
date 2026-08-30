import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_holder_missed',
  noun: 'Pass Holder',
  label: 'Pass Holder Missed a Window',
  description:
    "Triggers when an access window closes and one holder never turned up. Branch on join_requested: false means they never engaged at all, true means they queued and still did not appear. A window that never opened, or a purchase that landed too late to use, is NOT reported as missed — the fault has to plausibly be the customer's.",
  event: 'pass.holder_missed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.holder_missed',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
          subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE0000',
          subscriber_id: 'usr_01HXSUBSCRIBERSAMPLE000000',
          plan_id: 'pln_01HXPLANSAMPLE0000000000000',
          window_id: 'psw_01HXWINDOWSAMPLE00000000000',
          starts_at: '2026-09-20T13:00:00Z',
          ends_at: '2026-09-21T03:00:00Z',
          join_requested: false
    },
  },
});
