import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_canned_reply_created',
  noun: 'Canned Reply',
  label: 'New Canned Reply',
  description:
    "Triggers when a saved reply is added to a project's support picker. The snapshot carries the title, shortcut and position but not the body — read it with Get Canned Reply if you need the text.",
  event: 'support.canned_reply.created',
  sample: {
    id: 'evt_01HXEXAMPLECANNEDREPLY0001',
    type: 'support.canned_reply.created',
    created_at: '2026-09-06T09:40:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      canned_reply: {
        id: 'c2f8e6a1-7d34-4b9e-a05c-3e1f9b7d2a68',
        title: 'Opening hours',
        shortcut: 'hours',
        sort_order: 1,
      },
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    },
  },
});
