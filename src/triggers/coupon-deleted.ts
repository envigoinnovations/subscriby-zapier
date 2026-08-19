import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'coupon_deleted',
  noun: 'Coupon',
  label: 'Coupon Deleted',
  description:
    'Triggers when a discount code is deleted. The payload is a snapshot taken before the row was removed, because there is nothing left to look up afterwards. Deletion is refused while a checkout using the code is still in progress, so a wind-down usually fires Coupon Deactivated instead.',
  event: 'coupon.deleted',
  sample: {
    id: 'evt_01HXEXAMPLECOUPON000000005',
    type: 'coupon.deleted',
    created_at: '2026-12-05T10:30:00Z',
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
        active: false,
      },
    },
  },
});
