import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'knowledge_created',
  noun: 'Knowledge Entry',
  label: 'New Knowledge Entry',
  description:
    "Triggers when a project teaches Subscriby Copilot something new: a question with its answer or a document, from the dashboard, the API or an agent. The snapshot carries the entry's kind, audience, state, title and passage count but never its text — read it with Get Knowledge Entry if you need the words.",
  event: 'knowledge.created',
  sample: {
    id: 'evt_01HXEXAMPLEKNOWLEDGE000001',
    type: 'knowledge.created',
    created_at: '2026-10-19T16:02:11Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      entry: {
        id: '3b7e4d2a-9c1f-4a6b-8d5e-2f7c9a1b3e4d',
        kind: 'question',
        audience: 'members',
        status: 'ready',
        title: 'When does my membership renew?',
        chunk_count: 1,
      },
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    },
  },
});
