import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'partner_rate_changed',
  noun: 'Partner Rate',
  label: 'Partner Rate Changed',
  description:
    'Triggers when your commission rate moves, and why ("reason"): a commitment was verified or lapsed, or your paying referrals reached a volume tier. A raise reaches every referral still inside its commission period; a drop only new conversions.',
  event: 'partner.rate_changed',
  sample: {
    id: 'evt_01HXEXAMPLEPARTNER00000010',
    type: 'partner.rate_changed',
    created_at: '2026-12-03T16:40:12Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      partner_id: '2f6c1d0e-9a3b-4c5d-8e7f-6a5b4c3d2e1f',
      previous_percent: '5.00',
      commission_percent: '15.00',
      reason: 'commitment_verified',
      commitment_points: 10,
      volume_points: 0,
      paying_referrals: 3,
    },
  },
});
