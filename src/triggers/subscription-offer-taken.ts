import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_offer_taken',
  noun: 'Subscription',
  label: 'Subscription Offer Taken',
  description:
    'Triggers when a member takes the offer the cancellation screen made instead of cancelling: a pause for one billing cycle (with the day it ends), a discount on their renewals (with the coupon code applied), or a coupon to come back with (handed over, and the cancellation goes on).',
  event: 'subscription.offer_taken',
  sample: {
    id: 'evt_01HXEXAMPLERETENTION000005',
    type: 'subscription.offer_taken',
    created_at: '2026-10-22T09:31:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      cancellation_id: '9d2c6b71-3e48-4f0a-a5d7-1b8e4c9f2a36',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      offer: 'pause',
      coupon_code: null,
      resumes_at: '2026-11-22T09:31:00+00:00',
    },
  },
});
