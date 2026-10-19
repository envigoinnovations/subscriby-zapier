import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'knowledge_updated',
  noun: 'Knowledge Entry',
  label: 'Knowledge Entry Updated',
  description:
    "Triggers when a Knowledge entry's title, audience or text changes; a save that changes nothing fires nothing. The payload names the fields that moved and whether the text did, and carries the entry after the change without its words — an audience moving from members to team means the Copilot stopped answering members from it.",
  event: 'knowledge.updated',
  sample: {
    id: 'evt_01HXEXAMPLEKNOWLEDGE000002',
    type: 'knowledge.updated',
    created_at: '2026-10-19T16:40:08Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      changes: {
        audience: { from: 'members', to: 'team' },
      },
      entry: {
        id: '3b7e4d2a-9c1f-4a6b-8d5e-2f7c9a1b3e4d',
        kind: 'question',
        audience: 'team',
        status: 'ready',
        title: 'When does my membership renew?',
        chunk_count: 1,
      },
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      text_changed: false,
    },
  },
});
