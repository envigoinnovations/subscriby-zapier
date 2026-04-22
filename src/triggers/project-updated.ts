import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_updated',
  noun: 'Project',
  label: 'Project Updated',
  description:
    "Triggers when a project's profile (name, handle, description, terms, privacy, or bot) changes.",
  event: 'project.updated',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.updated',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      project: {
        id: 'prj_01HXPROJECTSAMPLE000000000',
        name: 'Research Premium',
        handle: 'research-premium',
        active: true,
      },
    },
  },
});
