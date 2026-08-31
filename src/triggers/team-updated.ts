import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'team_updated',
  noun: 'Team',
  label: 'Team Updated',
  description: 'Triggers when a team is renamed.',
  event: 'team.updated',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'team.updated',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      team_id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      name: 'Creator Team Renamed',
      owner_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
    },
  },
});
