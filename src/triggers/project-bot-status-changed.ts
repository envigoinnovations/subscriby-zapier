import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_bot_status_changed',
  noun: 'Bot',
  label: 'Bot Status Changed',
  description:
    "Triggers when a project bot's reachability changes — its token was revoked or regenerated, the bot was deleted, or Telegram started refusing it. Subscriby probes every project bot hourly and fires only on a transition, so this raises one event when the bot breaks and one when it recovers, not an alert every hour. Read data.status ('degraded' or 'healthy') and data.reason. Worth alerting on: a bot that cannot reach Telegram silently stops granting and revoking access while your plans keep selling.",
  event: 'project.bot.status_changed',
  sample: {
    id: 'evt_01HXEXAMPLE111111111111111',
    type: 'project.bot.status_changed',
    created_at: '2026-05-18T10:35:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      bot_id: '5e93b1d7-4a20-4c68-8f51-9b0d27e6a34c',
      status: 'degraded',
      reason: 'telegram_api_unauthorized',
    },
  },
});
