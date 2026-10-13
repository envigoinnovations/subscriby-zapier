import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'sequence_converted',
  noun: 'Sequence Enrollment',
  label: 'Sequence Converted',
  description:
    'Triggers when a member in a recovery sequence pays again: every open enrollment of theirs in the project ends as a win, the messages they received are counted as converted by that payment, and the creator is told. The payload names the enrollment, the sequence, the member and the payment that closed it.',
  event: 'sequence.converted',
  sample: {
    id: 'evt_01HXEXAMPLESEQUENCE000006',
    type: 'sequence.converted',
    created_at: '2026-11-01T17:20:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      enrollment_id: 'a4c7e912-3b5d-4f80-9e16-7d2a8c5b4f03',
      sequence_id: '3e9a7c21-5d84-4f06-b2c1-8a7e5d4f9b02',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      payment_id: 'f8e1c3a5-2d7b-4e96-b0c4-9a5d3f7e1b28',
      converted_at: '2026-11-01T17:20:00+00:00',
    },
  },
});
