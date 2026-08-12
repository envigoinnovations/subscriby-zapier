import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_joined',
  noun: 'Member',
  label: 'Member Joined',
  description:
    'Triggers when a subscriber redeems an access code against a non-trial plan. Paid checkouts do NOT fire this — use Subscription Activated for paying customers.',
  event: 'member.joined',
  sample: {
    id: 'evt_01HXEXAMPLE666666666666666',
    type: 'member.joined',
    created_at: '2026-05-18T10:35:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      access_code: 'SLATE-SUNDAY-4F2A9',
    },
  },
});
