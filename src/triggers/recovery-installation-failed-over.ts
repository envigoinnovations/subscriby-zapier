import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_installation_failed_over',
  noun: 'Recovery Installation',
  label: 'Recovery Installation Failed Over',
  description:
    'Triggers when automatic failover switches a project onto its standby bot without the creator, because the platform refused the live one (token revoked or regenerated, bot deleted). Members reachable by email are sent the new link on the creator\'s behalf; members_emailed says how many.',
  event: 'recovery.installation_failed_over',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.installation_failed_over',
    created_at: '2026-09-14T03:19:42Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      connector: 'telegram',
      installation_id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
      members_emailed: 214,
      operation_id: '9a4d2e71-5b38-4c6f-8e12-3d7c9b0a5f21',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      replaced_at: '2026-09-14T03:19:41Z',
    },
  },
});
