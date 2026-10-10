import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'partner_referral_signed_up',
  noun: 'Partner Referral',
  label: 'New Partner Referral',
  description:
    'Triggers when a creator signs up to Subscriby through your partner link, by typing your partner code or through the platform bot\'s deep link, and the referral is recorded ("status" starts as "signed_up"). The creator is named by display name alone. Use to log the creators you bring in.',
  event: 'partner.referral_signed_up',
  sample: {
    id: 'evt_01HXEXAMPLEPARTNER00000001',
    type: 'partner.referral_signed_up',
    created_at: '2026-11-20T09:14:02Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      referral_id: '9c1a7b3f-5d80-4e6a-8b45-2a91c4e76f38',
      referred_name: 'Ada Lovelace',
      source: 'link',
      expires_at: '2027-05-19T09:14:02+00:00',
    },
  },
});
