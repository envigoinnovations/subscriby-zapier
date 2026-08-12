import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_restored',
  noun: 'Project',
  label: 'Project Restored',
  description:
    'Triggers when a previously archived project is restored and accepting signups again.',
  event: 'project.restored',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.restored',
    created_at: '2026-05-18T10:05:00Z',
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
