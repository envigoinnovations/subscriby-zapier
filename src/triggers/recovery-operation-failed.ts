import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_operation_failed',
  noun: 'Recovery Operation',
  label: 'Recovery Operation Failed',
  description:
    'Triggers when a Disaster Recovery fails before changing anything, with the reason the ledger recorded. The allowance it spent is given back.',
  event: 'recovery.operation_failed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.operation_failed',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      operation_id: 'c2e8f1a9-6d47-4b3e-9f05-1a8d7c2e4b60',
      kind: 'bot',
      connector: 'telegram',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      automatic: false,
      on_demand: false,
      started_at: '2026-09-12T09:41:05Z',
      failure_reason: 'The platform refused the token.',
    },
  },
});
