import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'plan_order_changed',
  noun: 'Plan',
  label: 'Plan Order Changed',
  description:
    'Triggers when a creator arranges the order plans appear in on the public portal and in the Telegram bot, or resets it to the default. data.plan_ids lists the active plans in their new storefront order.',
  event: 'plan.order_changed',
  sample: {
    id: 'evt_01HXEXAMPLE444444444444444',
    type: 'plan.order_changed',
    created_at: '2026-09-08T14:10:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      plan_ids: [
        'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
        'b1a7c3d5-2e48-4f60-9a1b-7c5d3e820f94',
        'a9d2e4f6-1b3c-4d5e-8f70-2c4e6a8b0d1f',
      ],
    },
  },
});
