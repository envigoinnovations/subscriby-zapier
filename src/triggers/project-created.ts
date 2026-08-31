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
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      project: {
        id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
        name: 'Research Premium',
        handle: 'research-premium',
        active: true,
        team_id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      },
    },
  },
});
