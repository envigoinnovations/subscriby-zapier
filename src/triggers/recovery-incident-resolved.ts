import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_incident_resolved',
  noun: 'Recovery Incident',
  label: 'Recovery Incident Resolved',
  description:
    'Triggers when an open Disaster Recovery incident closes: a later probe found the account, bot or channel healthy again, or a recovery replaced it, in which case resolved_by_operation_id names the recovery.',
  event: 'recovery.incident_resolved',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.incident_resolved',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      incident_id: '6f1e9b27-4c3a-4d58-9e02-b7a1c5d38f64',
      kind: 'resources',
      connector: 'telegram',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      resolved_at: '2026-09-12T03:19:42Z',
      resolved_by_operation_id: '9a4d2e71-5b38-4c6f-8e12-3d7c9b0a5f21',
    },
  },
});
