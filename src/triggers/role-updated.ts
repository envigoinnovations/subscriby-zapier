import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'role_updated',
  noun: 'Role',
  label: 'Role Updated',
  description: "Triggers when a team role's name / abilities change.",
  event: 'role.updated',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'role.updated',
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
