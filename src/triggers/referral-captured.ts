import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'referral_captured',
  noun: 'Referral',
  label: 'New Referral',
  description:
    'Triggers when a friend arrives through an affiliate\'s link or types their code at checkout and is counted for them. "source" is "portal_link", "connector_link" or "code_at_checkout", "connector" names the bot\'s platform on a connector link, and "expires_at" is when the attribution lapses unless the friend pays. The affiliate earns only once the friend\'s first payment settles, which is Referral Converted.',
  event: 'referral.captured',
  sample: {
    id: 'evt_01HXEXAMPLEREFERRAL00000005',
    type: 'referral.captured',
    created_at: '2026-10-08T11:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      referral_id: '3c4d5e6f-7081-4a2b-9c3d-4e5f6a7b8c9d',
      affiliate_id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      subscriber_id: 'b2c3d4e5-f6a7-4819-9b0c-1d2e3f4a5b6c',
      source: 'connector_link',
      connector: 'telegram',
      expires_at: '2026-11-07T11:00:00+00:00',
    },
  },
});
