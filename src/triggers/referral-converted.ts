import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'referral_converted',
  noun: 'Referral',
  label: 'Referral Converted',
  description:
    'Triggers when a referred friend\'s first payment settles: the referral is now a conversion, the purchase is named, and "commission_ends_at" says until when the affiliate earns on this friend on a programme with a period (null for life, for a first-payment-only commission, or for a free-days programme). The reward itself arrives as Referral Reward Earned.',
  event: 'referral.converted',
  sample: {
    id: 'evt_01HXEXAMPLEREFERRAL00000006',
    type: 'referral.converted',
    created_at: '2026-10-09T14:20:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      referral_id: '3c4d5e6f-7081-4a2b-9c3d-4e5f6a7b8c9d',
      affiliate_id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      subscriber_id: 'b2c3d4e5-f6a7-4819-9b0c-1d2e3f4a5b6c',
      subscription_id: '5d6e7f80-91a2-4b3c-8d4e-5f6a7b8c9d0e',
      commission_ends_at: '2027-04-09T14:20:00+00:00',
    },
  },
});
