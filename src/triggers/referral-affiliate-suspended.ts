import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'referral_affiliate_suspended',
  noun: 'Referral Affiliate',
  label: 'Referral Affiliate Suspended',
  description:
    'Triggers when the creator suspends an affiliate: their code stops counting new friends and nothing new is earned, while what they already earned stays and can still be paid out.',
  event: 'referral.affiliate_suspended',
  sample: {
    id: 'evt_01HXEXAMPLEREFERRAL00000004',
    type: 'referral.affiliate_suspended',
    created_at: '2026-10-09T08:30:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      affiliate: {
        id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
        code: 'ADA2026',
        status: 'suspended',
        subscriber_id: 'a1b2c3d4-e5f6-4718-8a9b-0c1d2e3f4a5b',
        days_balance: 0,
        joined_at: '2026-10-08T09:05:00+00:00',
        approved_at: '2026-10-08T10:00:00+00:00',
      },
      subscriber_id: 'a1b2c3d4-e5f6-4718-8a9b-0c1d2e3f4a5b',
      status: 'suspended',
    },
  },
});
