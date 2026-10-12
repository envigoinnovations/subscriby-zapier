import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'checkout_recovered',
  noun: 'Checkout',
  label: 'Checkout Recovered',
  description:
    'Triggers when a charge settles for a member whose checkout had stalled: the stalled checkout closes as recovered, whichever door or rail the member finally paid through. The payload names the checkout, the member, the plan, the rail and surface of the checkout that stalled, the payment and subscription that finished it, and the sequence passage that was running, which ends as a conversion.',
  event: 'checkout.recovered',
  sample: {
    id: 'evt_01HXEXAMPLECHECKOUT0000002',
    type: 'checkout.recovered',
    created_at: '2026-11-01T15:40:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      checkout_id: 'c1d8e4f2-7a3b-4c96-8e05-2f6b9d1a4c73',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      provider: 'stripe',
      surface: 'portal',
      payment_id: 'f8e1c3a5-2d7b-4e96-b0c4-9a5d3f7e1b28',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      enrollment_id: 'a4c7e912-3b5d-4f80-9e16-7d2a8c5b4f03',
      stalled_at: '2026-11-01T11:00:00+00:00',
      recovered_at: '2026-11-01T15:40:00+00:00',
    },
  },
});
