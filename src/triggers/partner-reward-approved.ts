import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'partner_reward_approved',
  noun: 'Partner Reward',
  label: 'Partner Commission Approved',
  description:
    'Triggers when a commission\'s hold has passed and it is payable ("status" is "approved"): it will be applied as Subscriby Credit or counted towards your next cash payout. Use to keep a running payable total.',
  event: 'partner.reward_approved',
  sample: {
    id: 'evt_01HXEXAMPLEPARTNER00000004',
    type: 'partner.reward_approved',
    created_at: '2026-12-28T15:00:03Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      reward_id: 'e83d0b16-c5a4-4c39-97f2-5b7e2d401a86',
      referral_id: '9c1a7b3f-5d80-4e6a-8b45-2a91c4e76f38',
      invoice_id: 'in_1QmX8s2eZvKYlo2CkA9v4z1B',
      base_amount: '31.2000',
      amount: '9.3600',
      currency: 'USD',
      status: 'approved',
      hold_until: '2026-12-28T14:07:52+00:00',
    },
  },
});
