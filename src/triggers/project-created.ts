import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_created',
  noun: 'Project',
  label: 'New Project',
  description:
    'Triggers when a new project is created on the team. Useful for onboarding side-effects: seed welcome content, create Slack channel, notify ops.',
  event: 'project.created',
  sample: {
    id: 'evt_01HXEXAMPLEIIIIIIIIIIIIIII',
    type: 'project.created',
    created_at: '2026-05-18T08:00:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      project: {
        id: 'prj_01HXPROJECTSAMPLE000000000',
        name: 'Research Premium',
        handle: 'research-premium',
        active: true,
        team_id: 'tem_01HXTEAMSAMPLE0000000000000',
      },
    },
  },
});
