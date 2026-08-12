import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_resource_removed',
  noun: 'Member',
  label: 'Member Removed From Resource',
  description: 'Triggers when a member loses access to a specific Telegram resource.',
  event: 'member.resource_removed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.resource_removed',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      resource_id: 'rsr_01HXRESOURCESAMPLE00000000',
      resource_type: 'channel',
    },
  },
});
