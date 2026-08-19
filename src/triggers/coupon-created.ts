import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'coupon_created',
  noun: 'Coupon',
  label: 'New Coupon',
  description:
    'Triggers when a creator issues a new discount code. A coupon is one code any number of subscribers can redeem for money off — distinct from an access code, which is one code for one person and grants access outright. Use to announce a promotion, mirror it into a marketing tool, or log it for finance.',
  event: 'coupon.created',
  sample: {
    id: 'evt_01HXEXAMPLECOUPON000000001',
    type: 'coupon.created',
    created_at: '2026-11-20T09:00:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      coupon: {
        id: 'cpn_01HXCOUPONSAMPLE0000000000',
        code: 'BLACKFRIDAY',
        name: 'Black Friday 2026',
        discount_type: 'percentage',
        discount_value: '25',
        currency_id: null,
        duration: 'once',
        max_redemptions: 500,
        max_redemptions_per_user: 1,
        minimum_amount: null,
        starts_at: '2026-11-27T00:00:00Z',
        expires_at: '2026-12-01T23:59:00Z',
        active: true,
      },
    },
  },
});
