import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'group_deleted',
  noun: 'Group',
  label: 'Group Deleted',
  description: 'Triggers when a team group is deleted.',
  event: 'group.deleted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'group.deleted',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      team_id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      group_id: '1f68d92a-04c5-4e83-97b1-3d6a05e2f847',
      code: 'support',
    },
  },
});
