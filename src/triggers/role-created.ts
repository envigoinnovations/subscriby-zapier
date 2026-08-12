import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'role_created',
  noun: 'Role',
  label: 'Role Created',
  description: 'Triggers when a team role is created.',
  event: 'role.created',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'role.created',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      team_id: 'tem_01HXTEAMSAMPLE0000000000000',
      role_id: 'rol_01HXROLESAMPLE0000000000000',
      code: 'manager',
      name: 'Manager',
    },
  },
});
