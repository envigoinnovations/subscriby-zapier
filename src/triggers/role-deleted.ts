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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      role: {
        id: 'rol_01HXROLESAMPLE0000000000000',
        team_id: 'tem_01HXTEAMSAMPLE0000000000000',
        code: 'manager',
        name: 'Manager',
      },
    },
  },
});
