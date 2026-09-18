import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_access_extended',
  noun: 'Member',
  label: 'Member Access Extended',
  description:
    'Triggers when Outage Compensation banks the length of a connector outage on a member purchase, once per member. applies_at says when they feel it: now for a one-time purchase (ends_at moved), membership_end for a recurring plan (the time runs after the last paid period, because no gateway can move a renewal by a few hours).',
  event: 'member.access_extended',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.access_extended',
    created_at: '2026-09-13T13:21:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      applies_at: 'membership_end',
      banked_seconds: 11700,
      connector: 'telegram',
      ends_at: '2026-10-13T13:20:00Z',
      extended_seconds: 11700,
      outage_id: '9c1e4d2a-7b3f-4e8a-a2d1-5f6b7c8d9e0f',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
    },
  },
});
