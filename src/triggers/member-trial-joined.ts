import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_trial_joined',
  noun: 'Member',
  label: 'Trial Member Joined',
  description:
    'Triggers when a subscriber starts a cardless trial, or redeems an access code against a trial plan. A card-captured trial checkout does not fire this.',
  event: 'member.trial_joined',
  sample: {
    id: 'evt_01HXEXAMPLEAAAAAAAAAAAAAAA',
    type: 'member.trial_joined',
    created_at: '2026-05-18T10:30:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      trial_ends_at: '2026-05-25T10:05:00Z',
    },
  },
});
