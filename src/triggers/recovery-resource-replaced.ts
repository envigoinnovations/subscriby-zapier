import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_resource_replaced',
  noun: 'Recovery Resource',
  label: 'Recovery Resource Replaced',
  description:
    'Triggers when the creator points a resource at a replacement channel or group: a replacement after a ban, the standby in one click, or a healthy resource moved on demand (on_demand true, spending no allowance). One event per resource swapped.',
  event: 'recovery.resource_replaced',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.resource_replaced',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      operation_id: 'd4b7a2c9-1e58-4f36-8a0d-6c2e9b7f1a45',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      resource_title: 'Members',
      connector: 'telegram',
      replaced_at: '2026-06-20T18:04:11Z',
      on_demand: true,
    },
  },
});
