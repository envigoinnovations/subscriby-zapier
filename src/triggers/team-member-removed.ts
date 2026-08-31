import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'team_member_removed',
  noun: 'Team Member',
  label: 'Team Member Removed',
  description: 'Triggers when a collaborator is removed from a team.',
  event: 'team.member.removed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'team.member.removed',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      team_id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      user_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
    },
  },
});
