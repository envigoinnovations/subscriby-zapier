import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_operation_completed',
  noun: 'Recovery Operation',
  label: 'Recovery Operation Completed',
  description:
    'Triggers when a Disaster Recovery finishes and its changes stand. revert_window_ends_at says until when the creator may undo it; null for a bot replacement, which cannot be undone.',
  event: 'recovery.operation_completed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.operation_completed',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      operation_id: '9a4d2e71-5b38-4c6f-8e12-3d7c9b0a5f21',
      kind: 'resources',
      connector: 'telegram',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      automatic: true,
      on_demand: false,
      started_at: '2026-09-12T03:19:10Z',
      completed_at: '2026-09-12T03:19:42Z',
      revert_window_ends_at: '2026-09-13T03:19:42Z',
    },
  },
});
