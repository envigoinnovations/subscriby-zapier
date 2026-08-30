import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_holder_queued',
  noun: 'Pass Holder',
  label: 'Pass Holder Queued',
  description:
    "Triggers when a pass holder taps their invite link for a window that has not opened yet. Their join request is held and they will be admitted automatically when it opens — this is the moment a buyer stops being a risk. A holder who never taps produces no event at all.",
  event: 'pass.holder_queued',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.holder_queued',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
          subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE0000',
          subscriber_id: 'usr_01HXSUBSCRIBERSAMPLE000000',
          plan_id: 'pln_01HXPLANSAMPLE0000000000000',
          plan_kind: 'pass',
          window_id: 'psw_01HXWINDOWSAMPLE00000000000',
          source_plan_id: 'pln_01HXPLANSAMPLE0000000000000',
          starts_at: '2026-09-20T13:00:00Z',
          ends_at: '2026-09-21T03:00:00Z'
    },
  },
});
