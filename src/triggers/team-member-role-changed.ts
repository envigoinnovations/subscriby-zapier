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
      team_id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      user_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      role_id: 'd05e1a83-7c46-4f29-b613-8ae407c9d251',
    },
  },
});
