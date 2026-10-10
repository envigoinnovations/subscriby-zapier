import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'partner_payout_recorded',
  noun: 'Partner Payout',
  label: 'Partner Payout Recorded',
  description:
    'Triggers when Subscriby records a cash payout to you: the amount, the rail it went by, the transfer\'s reference and how many commissions it covered. Use to reconcile the money that arrived.',
  event: 'partner.payout_recorded',
  sample: {
    id: 'evt_01HXEXAMPLEPARTNER00000007',
    type: 'partner.payout_recorded',
    created_at: '2027-01-05T11:40:27Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      payout_id: '63be4915-8c07-4d3b-1a5d-9e34b6288f27',
      amount: '58.5000',
      currency: 'USD',
      method: 'paypal',
      reference: 'PAYPAL-7G2K1',
      rewards_paid: 5,
    },
  },
});
