import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'sequence_enrolled',
  noun: 'Sequence Enrollment',
  label: 'Sequence Enrolled',
  description:
    'Triggers when a member enters a win-back sequence: their membership ended and the project runs a sequence on that trigger, they hold no other live membership, and they were not already part-way through it. The payload names the enrollment, the sequence, the member, the membership that ended and when the first step is due.',
  event: 'sequence.enrolled',
  sample: {
    id: 'evt_01HXEXAMPLESEQUENCE000004',
    type: 'sequence.enrolled',
    created_at: '2026-10-25T08:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      enrollment_id: 'a4c7e912-3b5d-4f80-9e16-7d2a8c5b4f03',
      sequence_id: '3e9a7c21-5d84-4f06-b2c1-8a7e5d4f9b02',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      trigger: 'churned',
      next_due_at: '2026-10-28T08:00:00+00:00',
    },
  },
});
