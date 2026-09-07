import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_resource_status_changed',
  noun: 'Resource',
  label: 'Resource Status Changed',
  description:
    "Triggers when a linked Telegram channel or group enters or leaves a degraded state — the chat was deleted or banned, the bot was removed, lost its administrator role or its invite/restrict rights, or Telegram refused the probe. Subscriby probes every resource hourly (every five minutes around a pass window, and immediately when real work fails) and fires only on a transition, so this raises one event when the chat breaks and one when it recovers. Read data.status ('degraded' or 'healthy') and data.reason. A 'chat_not_found' or 'bot_removed' reason also opens a Disaster Recovery incident for the creator.",
  event: 'project.resource.status_changed',
  sample: {
    id: 'evt_01HXEXAMPLE222222222222222',
    type: 'project.resource.status_changed',
    created_at: '2026-09-07T10:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      status: 'degraded',
      reason: 'chat_not_found',
    },
  },
});
