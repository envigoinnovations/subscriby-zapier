import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_operation_reverted',
  noun: 'Recovery Operation',
  label: 'Recovery Operation Reverted',
  description:
    'Triggers when the creator undoes a Disaster Recovery inside its window: one event per swapped channel put back (resource_id names it), or one for an account relink undone (resource_id null).',
  event: 'recovery.operation_reverted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.operation_reverted',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      operation_id: '9a4d2e71-5b38-4c6f-8e12-3d7c9b0a5f21',
      kind: 'resources',
      connector: 'telegram',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      reverted_at: '2026-09-12T21:50:00Z',
    },
  },
});
