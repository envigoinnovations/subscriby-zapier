import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'access_code_generated',
  noun: 'Access Code',
  label: 'Access Codes Generated',
  description:
    'Triggers when a bulk-generate access-code job completes and codes are ready. Use to pipe codes into spreadsheets, CRMs, or email-distribution lists.',
  event: 'access_code.generated',
  sample: {
    id: 'evt_01HXEXAMPLEDDDDDDDDDDDDDDD',
    type: 'access_code.generated',
    created_at: '2026-05-18T11:00:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      plan_name: 'Premium Monthly',
      count: 50,
      expires_at: '2026-06-18T11:00:00Z',
    },
  },
});
