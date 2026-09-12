import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_operation_started',
  noun: 'Recovery Operation',
  label: 'Recovery Operation Started',
  description:
    'Triggers when a Disaster Recovery begins: an account relink, a bot replacement or a channel swap, run by the creator, by the platform (automatic) or on demand. Once per operation; swaps absorbed into a running channel recovery fire no second start.',
  event: 'recovery.operation_started',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.operation_started',
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
    },
  },
});
