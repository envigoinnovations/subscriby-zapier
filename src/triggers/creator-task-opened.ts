import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'creator_task_opened',
  noun: 'Creator Task',
  label: 'Creator Task Opened',
  description:
    'Triggers when a purchase entitles a subscriber to a manual resource — a perk no connector can give, which the creator hands over themselves — so a task is opened for the creator and the grant waits on it. One event per manual resource; Creator Task Completed follows with the same task_id once the creator marks it done.',
  event: 'creator_task.opened',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'creator_task.opened',
    created_at: '2026-09-12T10:05:30Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      task_id: '9e4b2c71-3d58-4a6f-b0e2-7c1d5f8a9b34',
      grant_id: '7d1c3e9a-2b64-4f0e-9a58-3c6b1d8e2f47',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      resource_kind: 'manual',
      instructions: 'Give Ada Lovelace access to Welcome packet.',
      due_at: null,
    },
  },
});
