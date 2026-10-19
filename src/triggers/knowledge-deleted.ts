import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'knowledge_deleted',
  noun: 'Knowledge Entry',
  label: 'Knowledge Entry Deleted',
  description:
    'Triggers when a Knowledge entry is removed with its passages and its file; the Copilot stops answering from it at once. The payload carries the entry as it was, without its text — nothing is recoverable, so keep your own copy from New Knowledge Entry and Get Knowledge Entry if you need history.',
  event: 'knowledge.deleted',
  sample: {
    id: 'evt_01HXEXAMPLEKNOWLEDGE000003',
    type: 'knowledge.deleted',
    created_at: '2026-10-19T17:12:45Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      entry: {
        id: '3b7e4d2a-9c1f-4a6b-8d5e-2f7c9a1b3e4d',
        kind: 'question',
        audience: 'team',
        status: 'ready',
        title: 'When does my membership renew?',
        chunk_count: 1,
      },
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    },
  },
});
