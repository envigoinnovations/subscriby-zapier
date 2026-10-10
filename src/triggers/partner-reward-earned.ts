import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'partner_reward_earned',
  noun: 'Partner Reward',
  label: 'Partner Commission Earned',
  description:
    'Triggers when a paid platform invoice of a creator you referred earns you a commission: priced from the invoice\'s total before tax and after discount ("base_amount") at the referral\'s locked rate ("amount", a decimal string in USD), born "pending" inside the hold. Use to mirror your commission ledger.',
  event: 'partner.reward_earned',
  sample: {
    id: 'evt_01HXEXAMPLEPARTNER00000003',
    type: 'partner.reward_earned',
    created_at: '2026-11-28T14:07:52Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      reward_id: 'e83d0b16-c5a4-4c39-97f2-5b7e2d401a86',
      referral_id: '9c1a7b3f-5d80-4e6a-8b45-2a91c4e76f38',
      invoice_id: 'in_1QmX8s2eZvKYlo2CkA9v4z1B',
      base_amount: '31.2000',
      amount: '9.3600',
      currency: 'USD',
      status: 'pending',
      hold_until: '2026-12-28T14:07:52+00:00',
    },
  },
});
