import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_resource_failed_over',
  noun: 'Recovery Resource',
  label: 'Recovery Resource Failed Over',
  description:
    'Triggers when automatic failover swaps a banned channel or group for its standby without the creator. Every active member is re-admitted into the standby; the roll call on the operation says how that is going.',
  event: 'recovery.resource_failed_over',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.resource_failed_over',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      operation_id: '9a4d2e71-5b38-4c6f-8e12-3d7c9b0a5f21',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      resource_title: 'Lounge',
      connector: 'telegram',
      replaced_at: '2026-09-12T03:19:41Z',
    },
  },
});
