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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      bot_id: 'bot_01HXBOTSAMPLE00000000000000',
      status: 'degraded',
      reason: 'telegram_api_unauthorized',
    },
  },
});
