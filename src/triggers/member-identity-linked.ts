import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_identity_linked',
  noun: 'Member',
  label: 'Member Connected Account',
  description:
    'Triggers when a member connects a platform account to their membership: from the portal, by signing in through a connector for the first time, or by adopting an account they use in another of the creator\'s projects.',
  event: 'member.identity_linked',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.identity_linked',
    created_at: '2026-09-12T10:06:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      identity_id: '0c2d8a7e-4b1f-4d3e-9a6b-2f5e8c1d7a90',
      connector: 'telegram',
      external_id: '123456789',
      display_name: 'Ada Lovelace',
      source: 'handshake',
      preferred: true,
    },
  },
});
