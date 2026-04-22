import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'team_member_invited',
  noun: 'Team Member',
  label: 'Team Member Invited',
  description: 'Triggers when a collaborator is invited to a team.',
  event: 'team.member.invited',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'team.member.invited',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      team: {
        id: 'tem_01HXTEAMSAMPLE0000000000000',
        name: 'Creator Team',
      },
      member: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        name: 'Jane Doe',
        email: 'jane@example.com',
      },
    },
  },
});
