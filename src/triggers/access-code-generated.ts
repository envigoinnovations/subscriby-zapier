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
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      plan_name: 'Premium Monthly',
      count: 50,
      expires_at: '2026-06-18T11:00:00Z',
    },
  },
});
