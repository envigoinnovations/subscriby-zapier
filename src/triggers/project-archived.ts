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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      project: {
        id: 'prj_01HXPROJECTSAMPLE000000000',
        name: 'Research Premium',
        handle: 'research-premium',
        active: false,
        team_id: 'tem_01HXTEAMSAMPLE0000000000000',
      },
    },
  },
});
