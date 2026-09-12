import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_incident_opened',
  noun: 'Recovery Incident',
  label: 'Recovery Incident Opened',
  description:
    'Triggers when a Disaster Recovery health probe finds something broken: the creator\'s sign-in account unreachable, a project\'s bot refused by the platform, or a channel or group gone or no longer administered. Once per incident; the same broken thing found again fires nothing until it resolves.',
  event: 'recovery.incident_opened',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.incident_opened',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      incident_id: '6f1e9b27-4c3a-4d58-9e02-b7a1c5d38f64',
      kind: 'resources',
      connector: 'telegram',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      reason: 'chat_not_found',
      detected_at: '2026-09-12T03:19:04Z',
    },
  },
});
