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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      expired_at: '2026-05-17T23:59:59Z',
    },
  },
});
