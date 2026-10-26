import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_design_published',
  noun: 'Portal Design',
  label: 'Portal Design Published',
  description:
    "Triggers when a project's drafted portal design is published, from the designer, the platform bot, the API or an agent. The payload names the sections whose keys changed against the design published before and when it went live; the design itself does not travel, so read it with Get Portal Design when the keys matter.",
  event: 'project.design_published',
  sample: {
    id: 'evt_01HXEXAMPLEPORTALDESIGN0001',
    type: 'project.design_published',
    created_at: '2026-10-26T16:40:08Z',
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
      published_at: '2026-10-26T16:40:08+00:00',
      sections: ['colours', 'typography'],
    },
  },
});
