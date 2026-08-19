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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      coupon_id: 'cpn_01HXCOUPONSAMPLE0000000000',
      code: 'BLACKFRIDAY',
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE0000',
      subscriber_id: 'pru_01HXSUBSCRIBERSAMPLE000000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      original_amount: '100.00',
      discount_amount: '25.00',
      final_amount: '75.00',
      currency_id: 'cur_01HXCURRENCYSAMPLE00000000',
      redemptions_count: 137,
      max_redemptions: 500,
    },
  },
});
