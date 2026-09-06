import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_settings_updated',
  noun: 'Support Settings',
  label: 'Support Settings Updated',
  description:
    "Triggers when a project's support inbox settings change: support on or off, the relay mode, the agent name, the auto-reply or email notifications. The payload carries the five settings a client may see and a changes map of what moved; the relay chat id is never included. Nothing fires when a save restates the stored values.",
  event: 'support.settings.updated',
  sample: {
    id: 'evt_01HXEXAMPLESUPPORTSET00001',
    type: 'support.settings.updated',
    created_at: '2026-09-06T10:02:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      settings: {
        enabled: true,
        relay_mode: 'owner_dm',
        agent_name: 'Team Research Premium',
        auto_reply: null,
        notify_email: false,
      },
      changes: {
        relay_mode: { from: 'none', to: 'owner_dm' },
        agent_name: { from: null, to: 'Team Research Premium' },
      },
    },
  },
});
