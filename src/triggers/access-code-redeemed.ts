import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'access_code_redeemed',
  noun: 'Access Code',
  label: 'Access Code Redeemed',
  description:
    'Triggers when a subscriber redeems an access code, regardless of whether it originated from a bulk batch or an ad-hoc gift. The Access Code field carries the full code, not a masked fragment.',
  event: 'access_code.redeemed',
  sample: {
    id: 'evt_01HXEXAMPLE555555555555555',
    type: 'access_code.redeemed',
    created_at: '2026-05-18T10:30:00Z',
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
