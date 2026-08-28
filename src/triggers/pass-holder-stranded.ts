import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_holder_stranded',
  noun: 'Pass Holder',
  label: 'Pass Holder Stranded',
  description:
    'Triggers once per pass holder whose access window was cancelled with no replacement available, so their pass ended. They have paid and received nothing, and Subscriby does not refund automatically — this event carries the amount, currency and gateway payment reference precisely because nothing in the dashboard records who is owed money. Timestamps are UTC.',
  event: 'pass.holder_stranded',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.holder_stranded',
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
      refund_due: true,
      amount_paid: '15.000',
      currency: 'GBP',
      payment_id: 'pi_3U9Jan4m40lWsKma0f3ntmnl',
    },
  },
});
