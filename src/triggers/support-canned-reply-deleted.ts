import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'support_canned_reply_deleted',
  noun: 'Canned Reply',
  label: 'Canned Reply Deleted',
  description:
    "Triggers when a saved reply is removed from a project's support picker. Replies already sent with the snippet are untouched.",
  event: 'support.canned_reply.deleted',
  sample: {
    id: 'evt_01HXEXAMPLECANNEDREPLY0003',
    type: 'support.canned_reply.deleted',
    created_at: '2026-09-06T10:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      canned_reply: {
        id: 'c2f8e6a1-7d34-4b9e-a05c-3e1f9b7d2a68',
        title: 'Opening hours',
        shortcut: 'open',
        sort_order: 1,
      },
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    },
  },
});
