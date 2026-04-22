import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_bot_connected',
  noun: 'Project',
  label: 'Project Bot Connected',
  description: 'Triggers when a Telegram bot is connected to a project.',
  event: 'project.bot.connected',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.bot.connected',
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
