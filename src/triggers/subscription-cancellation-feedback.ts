import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'subscription_cancellation_feedback',
  noun: 'Subscription',
  label: 'Subscription Cancellation Feedback',
  description:
    'Triggers when a member reaches the cancellation screen and says why they are leaving: the reason from the fixed list, the sentence they added, the offer they were shown next (a pause, a discount or a return coupon) and whether they answered on the portal or in a connector chat. Fires before they decide, so a member who then takes the offer still appears here.',
  event: 'subscription.cancellation_feedback',
  sample: {
    id: 'evt_01HXEXAMPLERETENTION000004',
    type: 'subscription.cancellation_feedback',
    created_at: '2026-10-22T09:30:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      cancellation_id: '9d2c6b71-3e48-4f0a-a5d7-1b8e4c9f2a36',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      reason: 'too_expensive',
      feedback: 'Money is tight this quarter.',
      offer_shown: 'pause',
      surface: 'portal',
    },
  },
});
