import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'group_members_synced',
  noun: 'Group',
  label: 'Group Members Synced',
  description:
    'Triggers when the membership of a permission group changes. Carries who was added and who was removed, so an access-control mirror does not have to diff two snapshots itself.',
  event: 'group.members_synced',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'group.members_synced',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      group_id: '1f68d92a-04c5-4e83-97b1-3d6a05e2f847',
      team_id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      code: 'billing-team',
      name: 'Billing Team',
      member_ids: ['2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80'],
      added_ids: ['2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80'],
      removed_ids: [],
      member_count: 1,
    },
  },
});
