import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'access_code_redeemed',
  noun: 'Access Code',
  label: 'Access Code Redeemed',
  description:
    'Triggers when a subscriber redeems an access code, regardless of whether it originated from a bulk batch or an ad-hoc gift. The Access Code field carries the full code, not a masked fragment.',
  event: 'access_code.redeemed',
  sample: {
    id: 'evt_01HXEXAMPLE555555555555555',
    type: 'access_code.redeemed',
    created_at: '2026-05-18T10:30:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      access_code: 'SLATE-SUNDAY-4F2A9',
    },
  },
});
