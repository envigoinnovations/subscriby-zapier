import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'referral_reward_reversed',
  noun: 'Referral Reward',
  label: 'Referral Reward Reversed',
  description:
    'Triggers when a refund takes a reward back: a commission still inside its hold is reversed outright, and one already paid out is clawed back with a negative row named by "clawback_reward_id", which the affiliate\'s next payout nets against. "reason" says which. Use to adjust what you owe before paying.',
  event: 'referral.reward_reversed',
  sample: {
    id: 'evt_01HXEXAMPLEREFERRAL00000009',
    type: 'referral.reward_reversed',
    created_at: '2026-10-12T09:45:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      reward_id: '8e9f0a1b-2c3d-4e5f-8a9b-0c1d2e3f4a5b',
      referral_id: '3c4d5e6f-7081-4a2b-9c3d-4e5f6a7b8c9d',
      affiliate_id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      amount: '12.0000',
      currency_id: 'f0e1d2c3-b4a5-4697-8877-665544332211',
      reason: 'refunded',
      clawback_reward_id: null,
    },
  },
});
