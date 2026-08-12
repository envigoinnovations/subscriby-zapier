import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'team_member_role_changed',
  noun: 'Team Member',
  label: 'Team Member Role Changed',
  description: "Triggers when a collaborator's role on a team changes.",
  event: 'team.member.role_changed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'team.member.role_changed',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      team_id: 'tem_01HXTEAMSAMPLE0000000000000',
      user_id: 'usr_01HXUSERSAMPLE0000000000000',
      role_id: 'rol_01HXROLESAMPLE0000000000000',
    },
  },
});
