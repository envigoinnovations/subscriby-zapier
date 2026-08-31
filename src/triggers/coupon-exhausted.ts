import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'coupon_exhausted',
  noun: 'Coupon',
  label: 'Coupon Exhausted',
  description:
    'Triggers when the last use of a capped discount code is claimed, so you can react to a promotion selling out without polling. Never fires for an uncapped code. Rides on the same settlement as Coupon Redeemed, so expect both for the final redemption.',
  event: 'coupon.exhausted',
  sample: {
    id: 'evt_01HXEXAMPLECOUPON000000007',
    type: 'coupon.exhausted',
    created_at: '2026-11-29T19:04:55Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      coupon_id: '4b9d3e08-a1f6-4275-9c83-7e01d6a2f594',
      code: 'BLACKFRIDAY',
      max_redemptions: 500,
      redemptions_count: 500,
    },
  },
});
