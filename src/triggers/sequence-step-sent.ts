import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'sequence_step_sent',
  noun: 'Sequence Step',
  label: 'Sequence Step Sent',
  description:
    'Triggers when one step of a recovery sequence reaches a member: the hourly sweep found the step due, filled the placeholders, carried the way back as a button and the member\'s connector delivered it. The payload names the enrollment, the step and its position, and the coupon code the step carried, if any.',
  event: 'sequence.step_sent',
  sample: {
    id: 'evt_01HXEXAMPLESEQUENCE000005',
    type: 'sequence.step_sent',
    created_at: '2026-10-28T08:05:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      enrollment_id: 'a4c7e912-3b5d-4f80-9e16-7d2a8c5b4f03',
      sequence_id: '3e9a7c21-5d84-4f06-b2c1-8a7e5d4f9b02',
      step_id: '6b1f3d58-9c2a-4e7d-a0f4-2d8c7b5e1a93',
      position: 1,
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      coupon_code: null,
      sent_at: '2026-10-28T08:05:00+00:00',
    },
  },
});
