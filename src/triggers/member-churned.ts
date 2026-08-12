import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_churned',
  noun: 'Member',
  label: 'Member Churned',
  description:
    'Triggers when a member churns (cancelled + past their paid window, or non-renewing).',
  event: 'member.churned',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.churned',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      ends_at: '2026-06-18T10:05:00Z',
      last_plan_id: 'pln_01HXPLANSAMPLE0000000000000',
    },
  },
});
