import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'coupon_deactivated',
  noun: 'Coupon',
  label: 'Coupon Deactivated',
  description:
    'Triggers when a discount code is switched off. New redemptions stop immediately, though a checkout already in progress with the code still completes. This is the safe way to retire a code, so expect it rather than Coupon Deleted in most wind-downs.',
  event: 'coupon.deactivated',
  sample: {
    id: 'evt_01HXEXAMPLECOUPON000000004',
    type: 'coupon.deactivated',
    created_at: '2026-12-02T08:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      coupon: {
        id: '4b9d3e08-a1f6-4275-9c83-7e01d6a2f594',
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
