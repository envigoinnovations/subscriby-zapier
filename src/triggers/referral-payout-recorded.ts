import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'referral_payout_recorded',
  noun: 'Referral Payout',
  label: 'Referral Payout Recorded',
  description:
    'Triggers when the creator records a payout to an affiliate: money that already left, filed so the ledger marks the oldest payable commissions in that currency as paid. "rewards_paid" is how many commissions it covered and "reference" the creator\'s own note of the transfer. Use to log payouts in accounting.',
  event: 'referral.payout_recorded',
  sample: {
    id: 'evt_01HXEXAMPLEREFERRAL00000010',
    type: 'referral.payout_recorded',
    created_at: '2026-11-01T10:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      payout_id: 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f',
      affiliate_id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      amount: '30.0000',
      currency_id: 'f0e1d2c3-b4a5-4697-8877-665544332211',
      reference: 'PAYPAL-7F3D1C92',
      rewards_paid: 3,
    },
  },
});
