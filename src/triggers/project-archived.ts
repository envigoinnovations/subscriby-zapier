import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_archived',
  noun: 'Project',
  label: 'Project Archived',
  description:
    'Triggers when a project is archived — new signups paused, existing subscribers retained.',
  event: 'project.archived',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.archived',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      project: {
        id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
        name: 'Research Premium',
        handle: 'research-premium',
        active: false,
        team_id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      },
    },
  },
});
