import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_converted',
  noun: 'Member',
  label: 'Member Converted',
  description:
    'Triggers when a trialing or lead member converts into a paying customer.',
  event: 'member.converted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.converted',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      member: {
        id: 'mem_01HXMEMBERSAMPLE00000000000',
        project_id: 'prj_01HXPROJECTSAMPLE000000000',
        status: 'active',
      },
    },
  },
});
