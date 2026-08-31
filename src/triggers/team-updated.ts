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
      team_id: 'tem_01HXTEAMSAMPLE0000000000000',
      name: 'Creator Team Renamed',
      owner_id: 'usr_01HXUSERSAMPLE0000000000000',
    },
  },
});
