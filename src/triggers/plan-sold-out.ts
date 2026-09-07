import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'plan_sold_out',
  noun: 'Plan',
  label: 'Plan Sold Out',
  description:
    "Triggers when a plan reaches its sales cap (or a pass series fills its last seat) and Subscriby pauses it automatically. The plan is taken off sale until the creator switches it back on; existing subscribers are untouched. Read data.reason ('sales_cap_reached' or 'seat_cap_reached'), data.sales_cap and data.sales_cap_sold. A plan.deactivated event fires alongside it for automations that only watch availability.",
  event: 'plan.sold_out',
  sample: {
    id: 'evt_01HXEXAMPLE333333333333333',
    type: 'plan.sold_out',
    created_at: '2026-09-08T14:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      plan: {
        id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
        name: 'Founding Members',
        price: '49.00',
        active: false,
      },
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      plan_name: 'Founding Members',
      reason: 'sales_cap_reached',
      sales_cap: 10,
      sales_cap_sold: 10,
    },
  },
});
