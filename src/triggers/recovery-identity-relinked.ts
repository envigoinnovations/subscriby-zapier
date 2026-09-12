import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_identity_relinked',
  noun: 'Recovery Identity',
  label: 'Recovery Identity Relinked',
  description:
    'Triggers when a creator\'s sign-in account is moved to another account on the connector after a ban: a newly detected account, or the registered backup switched in (from_backup true). An account-level event: project_id is null.',
  event: 'recovery.identity_relinked',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.identity_relinked',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      operation_id: 'e7c3d9a1-2f64-4b08-9d5e-4a1b8c6f2d73',
      connector: 'telegram',
      identity_id: '3c9e1f7a-8b25-4d60-a1f4-7e2c5b9d0a18',
      display_name: 'Ada (new)',
      from_backup: false,
      started_at: '2026-08-01T11:12:29Z',
      completed_at: '2026-08-01T11:12:30Z',
    },
  },
});
