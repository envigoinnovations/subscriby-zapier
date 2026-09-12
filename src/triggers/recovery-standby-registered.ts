import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_standby_registered',
  noun: 'Recovery Standby',
  label: 'Recovery Standby Registered',
  description:
    'Triggers when a standby is kept ready for Disaster Recovery: a standby bot for a project (standby: installation) or a standby channel or group for one resource (standby: resource), with whether posts are mirrored into it.',
  event: 'recovery.standby_registered',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.standby_registered',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      standby: 'resource',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      connector: 'telegram',
      mirror: true,
    },
  },
});
