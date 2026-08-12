import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_bot_disconnected',
  noun: 'Project',
  label: 'Project Bot Disconnected',
  description: 'Triggers when a Telegram bot is disconnected from a project.',
  event: 'project.bot.disconnected',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'project.bot.disconnected',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      bot_id: 'bot_01HXBOTSAMPLE00000000000000',
    },
  },
});
