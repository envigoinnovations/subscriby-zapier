import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'role_deleted',
  noun: 'Role',
  label: 'Role Deleted',
  description: 'Triggers when a team role is deleted.',
  event: 'role.deleted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'role.deleted',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      team_id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      role_id: 'd05e1a83-7c46-4f29-b613-8ae407c9d251',
      code: 'manager',
    },
  },
});
