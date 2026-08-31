import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'coupon_activated',
  noun: 'Coupon',
  label: 'Coupon Activated',
  description:
    'Triggers when a discount code is switched on and starts being offered at checkout. Note that a code inside a start/end window only becomes usable once that window opens, so an activation is not always the moment redemptions begin.',
  event: 'coupon.activated',
  sample: {
    id: 'evt_01HXEXAMPLECOUPON000000003',
    type: 'coupon.activated',
    created_at: '2026-11-27T00:00:02Z',
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
        active: true,
      },
    },
  },
});
