import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'referral_affiliate_joined',
  noun: 'Referral Affiliate',
  label: 'New Referral Affiliate',
  description:
    'Triggers when a member joins a project\'s Referral Program, from the portal, a connector\'s bot or by the creator enrolling them by hand. "status" is "approved" when their code counts at once and "pending" while the creator still has to approve them. The affiliate\'s payout details never travel.',
  event: 'referral.affiliate_joined',
  sample: {
    id: 'evt_01HXEXAMPLEREFERRAL00000002',
    type: 'referral.affiliate_joined',
    created_at: '2026-10-08T09:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      affiliate: {
        id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
        code: 'ADA2026',
        status: 'approved',
        subscriber_id: 'a1b2c3d4-e5f6-4718-8a9b-0c1d2e3f4a5b',
        days_balance: 0,
        joined_at: '2026-10-08T09:05:00+00:00',
        approved_at: '2026-10-08T09:05:00+00:00',
      },
      subscriber_id: 'a1b2c3d4-e5f6-4718-8a9b-0c1d2e3f4a5b',
      status: 'approved',
    },
  },
});
