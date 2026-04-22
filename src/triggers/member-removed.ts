import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_removed',
  noun: 'Member',
  label: 'Member Removed',
  description: 'Triggers when a member is removed from every resource on a project.',
  event: 'member.removed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.removed',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      member: {
        id: 'mem_01HXMEMBERSAMPLE00000000000',
        project_id: 'prj_01HXPROJECTSAMPLE000000000',
        status: 'removed',
      },
    },
  },
});
