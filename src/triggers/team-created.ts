import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'team_created',
  noun: 'Team',
  label: 'Team Created',
  description: 'Triggers when a new team is created.',
  event: 'team.created',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'team.created',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      team: {
        id: 'tem_01HXTEAMSAMPLE0000000000000',
        name: 'Creator Team',
      },
    },
  },
});
