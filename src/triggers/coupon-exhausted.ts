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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      coupon_id: 'cpn_01HXCOUPONSAMPLE0000000000',
      code: 'BLACKFRIDAY',
      max_redemptions: 500,
      redemptions_count: 500,
    },
  },
});
