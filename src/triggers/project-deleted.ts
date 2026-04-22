import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_deleted',
  noun: 'Project',
  label: 'Project Deleted',
  description: 'Triggers when a project is permanently deleted.',
  event: 'project.deleted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.deleted',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      project: {
        id: 'prj_01HXPROJECTSAMPLE000000000',
        name: 'Research Premium',
        handle: 'research-premium',
        active: false,
      },
    },
  },
});
