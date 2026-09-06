import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_canned_reply_updated',
  noun: 'Canned Reply',
  label: 'Canned Reply Updated',
  description:
    "Triggers when a saved reply's title, body, shortcut or position changes. The changes map names only what moved; a body change appears as a change entry without the text itself. Nothing fires when an edit restates the stored values.",
  event: 'support.canned_reply.updated',
  sample: {
    id: 'evt_01HXEXAMPLECANNEDREPLY0002',
    type: 'support.canned_reply.updated',
    created_at: '2026-09-06T09:50:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      canned_reply: {
        id: 'c2f8e6a1-7d34-4b9e-a05c-3e1f9b7d2a68',
        title: 'Opening hours',
        shortcut: 'open',
        sort_order: 1,
      },
      changes: {
        shortcut: { from: 'hours', to: 'open' },
      },
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    },
  },
});
