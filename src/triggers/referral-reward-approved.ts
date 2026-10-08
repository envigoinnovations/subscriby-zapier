import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'referral_reward_approved',
  noun: 'Referral Reward',
  label: 'Referral Reward Approved',
  description:
    'Triggers when a held cash commission passes the programme\'s hold and becomes payable: the refund window is over and the amount now counts towards the affiliate\'s payable balance. Use to queue a payout in your own tools; record it back with Record Referral Payout.',
  event: 'referral.reward_approved',
  sample: {
    id: 'evt_01HXEXAMPLEREFERRAL00000008',
    type: 'referral.reward_approved',
    created_at: '2026-10-23T15:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      reward_id: '8e9f0a1b-2c3d-4e5f-8a9b-0c1d2e3f4a5b',
      referral_id: '3c4d5e6f-7081-4a2b-9c3d-4e5f6a7b8c9d',
      affiliate_id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      beneficiary: 'referrer',
      kind: 'cash',
      days: null,
      amount: '12.0000',
      currency_id: 'f0e1d2c3-b4a5-4697-8877-665544332211',
      status: 'approved',
      hold_until: '2026-10-23T14:20:01+00:00',
      payment_id: '9f0a1b2c-3d4e-4f5a-9b0c-1d2e3f4a5b6c',
    },
  },
});
