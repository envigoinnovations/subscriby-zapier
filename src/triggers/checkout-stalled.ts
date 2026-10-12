import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'checkout_stalled',
  noun: 'Checkout',
  label: 'Checkout Stalled',
  description:
    'Triggers when a checkout a member started on the portal or in the project bot stays open past the window the project set (one hour by default) with no settled charge and no live membership. Fires once per member per day: later checkouts of the same member inside that day are counted as stalled in silence. The payload names the checkout, the member, the plan, the rail, the surface and the stalled-checkout sequence passage opened for them, when one was.',
  event: 'checkout.stalled',
  sample: {
    id: 'evt_01HXEXAMPLECHECKOUT0000001',
    type: 'checkout.stalled',
    created_at: '2026-11-01T11:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      checkout_id: 'c1d8e4f2-7a3b-4c96-8e05-2f6b9d1a4c73',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      provider: 'stripe',
      surface: 'portal',
      started_at: '2026-11-01T09:55:00+00:00',
      stalled_at: '2026-11-01T11:00:00+00:00',
      enrollment_id: 'a4c7e912-3b5d-4f80-9e16-7d2a8c5b4f03',
    },
  },
});
