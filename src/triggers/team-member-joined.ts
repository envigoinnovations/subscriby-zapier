import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'team_member_joined',
  noun: 'Team Member',
  label: 'Team Member Joined',
  description:
    'Triggers when a collaborator accepts a team invitation and joins.',
  event: 'team.member.joined',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'team.member.joined',
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
