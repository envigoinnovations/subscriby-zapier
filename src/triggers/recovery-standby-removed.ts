import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_standby_removed',
  noun: 'Recovery Standby',
  label: 'Recovery Standby Removed',
  description:
    'Triggers when a Disaster Recovery standby is no longer kept: removed by the creator, replaced by another standby bot, or used by a recovery (reason: removed, replaced or used).',
  event: 'recovery.standby_removed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.standby_removed',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      standby: 'resource',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      connector: 'telegram',
      reason: 'used',
    },
  },
});
