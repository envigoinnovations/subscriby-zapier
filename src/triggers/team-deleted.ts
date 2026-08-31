import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'team_deleted',
  noun: 'Team',
  label: 'Team Deleted',
  description: 'Triggers when a team is deleted.',
  event: 'team.deleted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'team.deleted',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      team_id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      name: 'Creator Team',
    },
  },
});
