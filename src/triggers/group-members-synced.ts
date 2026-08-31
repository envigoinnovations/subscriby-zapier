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
      group_id: 'grp_01HXGROUPSAMPLE000000000000',
      team_id: 'tem_01HXTEAMSAMPLE0000000000000',
      code: 'billing-team',
      name: 'Billing Team',
      member_ids: ['usr_01HXUSERSAMPLE0000000000000'],
      added_ids: ['usr_01HXUSERSAMPLE0000000000000'],
      removed_ids: [],
      member_count: 1,
    },
  },
});
