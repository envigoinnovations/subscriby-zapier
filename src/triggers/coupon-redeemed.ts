import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'coupon_redeemed',
  noun: 'Coupon Redemption',
  label: 'Coupon Redeemed',
  description:
    'Triggers when a subscriber actually pays with a discount code. Fires on settlement, not when the code is applied \u2014 an abandoned checkout never reaches this. `final_amount` is what was charged and is the figure to use for revenue reporting; `original_amount` is the plan\u2019s list price. Amounts are strings to avoid floating-point loss.',
  event: 'coupon.redeemed',
  sample: {
    id: 'evt_01HXEXAMPLECOUPON000000006',
    type: 'coupon.redeemed',
    created_at: '2026-11-27T14:22:10Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      coupon_id: '4b9d3e08-a1f6-4275-9c83-7e01d6a2f594',
      code: 'BLACKFRIDAY',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      subscriber_id: '6f9b2e37-c184-4a05-8d72-30e16bc9f458',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      original_amount: '100.00',
      discount_amount: '25.00',
      final_amount: '75.00',
      currency_id: '8f27a0d4-63be-4915-8c07-1a5d9e34b628',
      redemptions_count: 137,
      max_redemptions: 500,
    },
  },
});
