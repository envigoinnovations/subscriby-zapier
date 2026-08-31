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
    project_id: null,
    data: {
      team_id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      email: 'jane@example.com',
      role_id: 'd05e1a83-7c46-4f29-b613-8ae407c9d251',
      role_code: 'manager',
    },
  },
});
