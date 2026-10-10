import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'partner_referral_converted',
  noun: 'Partner Referral',
  label: 'Partner Referral Converted',
  description:
    'Triggers when a referred creator\'s first paid Starter or Growth invoice settles: the referral is converted, the rate you earn on them is locked ("commission_percent") and "commission_ends_at" says until when. Use to celebrate a conversion or update a tracker.',
  event: 'partner.referral_converted',
  sample: {
    id: 'evt_01HXEXAMPLEPARTNER00000002',
    type: 'partner.referral_converted',
    created_at: '2026-11-28T14:07:52Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      referral_id: '9c1a7b3f-5d80-4e6a-8b45-2a91c4e76f38',
      plan: 'starter',
      commission_percent: '30.00',
      commission_ends_at: '2027-11-28T14:07:52+00:00',
    },
  },
});
