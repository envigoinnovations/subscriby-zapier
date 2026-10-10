import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'partner_reward_credited',
  noun: 'Partner Reward',
  label: 'Partner Commission Credited',
  description:
    'Triggers when a payable commission is applied to your Subscriby balance as Subscriby Credit, with the Stripe balance transaction that carried it. Fires only on the credit rail.',
  event: 'partner.reward_credited',
  sample: {
    id: 'evt_01HXEXAMPLEPARTNER00000005',
    type: 'partner.reward_credited',
    created_at: '2026-12-28T15:00:04Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      reward_id: 'e83d0b16-c5a4-4c39-97f2-5b7e2d401a86',
      referral_id: '9c1a7b3f-5d80-4e6a-8b45-2a91c4e76f38',
      amount: '9.3600',
      currency: 'USD',
      balance_transaction_id: 'cbtxn_1QmX8s2eZvKYlo2CkA9v4z1B',
    },
  },
});
