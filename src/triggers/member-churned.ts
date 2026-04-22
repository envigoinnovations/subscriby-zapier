import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_churned',
  noun: 'Member',
  label: 'Member Churned',
  description:
    'Triggers when a member churns (cancelled + past their paid window, or non-renewing).',
  event: 'member.churned',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.churned',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      member: {
        id: 'mem_01HXMEMBERSAMPLE00000000000',
        project_id: 'prj_01HXPROJECTSAMPLE000000000',
        status: 'churned',
      },
    },
  },
});
