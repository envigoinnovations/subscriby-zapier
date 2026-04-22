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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      group: {
        id: 'grp_01HXGROUPSAMPLE00000000000',
        team_id: 'tem_01HXTEAMSAMPLE0000000000000',
        code: 'support',
        name: 'Support',
      },
    },
  },
});
