import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'referral_affiliate_approved',
  noun: 'Referral Affiliate',
  label: 'Referral Affiliate Approved',
  description:
    'Triggers when the creator approves a pending or suspended affiliate: their code counts from now on and they have been handed their link, code and the programme\'s terms. Use to welcome a new affiliate in your own tools or to mirror the roster into a CRM.',
  event: 'referral.affiliate_approved',
  sample: {
    id: 'evt_01HXEXAMPLEREFERRAL00000003',
    type: 'referral.affiliate_approved',
    created_at: '2026-10-08T10:00:00Z',
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
        approved_at: '2026-10-08T10:00:00+00:00',
      },
      subscriber_id: 'a1b2c3d4-e5f6-4718-8a9b-0c1d2e3f4a5b',
      status: 'approved',
    },
  },
});
