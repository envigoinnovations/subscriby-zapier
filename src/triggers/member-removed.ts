import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_removed',
  noun: 'Member',
  label: 'Member Removed',
  description:
    'Triggers when a creator manually removes a subscriber from a project. The subscriber is soft-deleted, access is revoked, and any active subscription is cancelled.',
  event: 'member.removed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.removed',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscriber: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        telegram_user_id: '123456789',
        status: 'churned',
      },
      reason: 'Removed by creator',
    },
  },
});
