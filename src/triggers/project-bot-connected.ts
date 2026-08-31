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
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      bot_id: '5e93b1d7-4a20-4c68-8f51-9b0d27e6a34c',
      bot_name: 'ResearchPremiumBot',
      bot_url: 'https://t.me/ResearchPremiumBot',
    },
  },
});
