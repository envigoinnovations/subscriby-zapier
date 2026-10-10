import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'partner_reward_reversed',
  noun: 'Partner Reward',
  label: 'Partner Commission Reversed',
  description:
    'Triggers when a commission is reversed by a full refund, a dispute or a rejected review ("reason"), or clawed back after it was already settled ("clawback_reward_id" names the negative row that nets it against your next settlement).',
  event: 'partner.reward_reversed',
  sample: {
    id: 'evt_01HXEXAMPLEPARTNER00000006',
    type: 'partner.reward_reversed',
    created_at: '2026-12-05T09:20:44Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      reward_id: 'e83d0b16-c5a4-4c39-97f2-5b7e2d401a86',
      referral_id: '9c1a7b3f-5d80-4e6a-8b45-2a91c4e76f38',
      amount: '9.3600',
      currency: 'USD',
      reason: 'refund',
      clawback_reward_id: '1a5d9e34-b628-4915-8c07-8f27a0d463be',
    },
  },
});
