import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'access_code_expired',
  noun: 'Access Code',
  label: 'Access Code Expired',
  description:
    'Triggers when an unredeemed access code crosses its expiry window during the nightly cleanup sweep. Use for re-issue flows or reporting on unredeemed distribution.',
  event: 'access_code.expired',
  sample: {
    id: 'evt_01HXEXAMPLEEEEEEEEEEEEEEEE',
    type: 'access_code.expired',
    created_at: '2026-05-18T00:15:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      expired_at: '2026-05-17T23:59:59Z',
    },
  },
});
