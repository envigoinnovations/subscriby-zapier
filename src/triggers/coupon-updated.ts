import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'coupon_updated',
  noun: 'Coupon',
  label: 'Coupon Updated',
  description:
    'Triggers when a discount code\u2019s terms change. `data.changes` names only the fields that actually moved, each with its previous and new value, so you do not have to diff against your own copy. Switching a code on or off fires Coupon Activated / Coupon Deactivated instead.',
  event: 'coupon.updated',
  sample: {
    id: 'evt_01HXEXAMPLECOUPON000000002',
    type: 'coupon.updated',
    created_at: '2026-11-21T11:15:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      coupon: {
        id: '4b9d3e08-a1f6-4275-9c83-7e01d6a2f594',
        code: 'BLACKFRIDAY',
        name: 'Black Friday 2026',
        discount_type: 'percentage',
        discount_value: '30',
        currency_id: null,
        duration: 'once',
        max_redemptions: 500,
        max_redemptions_per_user: 1,
        minimum_amount: null,
        starts_at: '2026-11-27T00:00:00Z',
        expires_at: '2026-12-01T23:59:00Z',
        active: true,
      },
      changes: {
        discount_value: { from: '25', to: '30' },
      },
    },
  },
});
