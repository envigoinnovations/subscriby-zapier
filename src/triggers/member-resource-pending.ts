import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_resource_pending',
  noun: 'Member',
  label: 'Member Access Pending',
  description:
    'Triggers when a subscriber is entitled to a resource but has no account on its connector yet, so access waits for them to connect one; Member Added to Resource follows with the same grant_id once they do.',
  event: 'member.resource_pending',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.resource_pending',
    created_at: '2026-09-12T10:05:30Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      resource_type: 'channel',
      connector: 'telegram',
      grant_id: '7d1c3e9a-2b64-4f0e-9a58-3c6b1d8e2f47',
      mode: 'bearer_link',
    },
  },
});
