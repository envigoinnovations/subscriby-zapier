import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'sequence_exited',
  noun: 'Sequence Enrollment',
  label: 'Sequence Exited',
  description:
    'Triggers when a member leaves a recovery sequence before its last step for a reason other than paying again: the creator switched the sequence off ("disabled") or deleted it ("deleted"), or the member could not be reached on any connected account ("opted_out"). A member who pays again fires Sequence Converted instead, and one who receives every step completes quietly.',
  event: 'sequence.exited',
  sample: {
    id: 'evt_01HXEXAMPLESEQUENCE000007',
    type: 'sequence.exited',
    created_at: '2026-11-02T14:10:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      enrollment_id: 'a4c7e912-3b5d-4f80-9e16-7d2a8c5b4f03',
      sequence_id: '3e9a7c21-5d84-4f06-b2c1-8a7e5d4f9b02',
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      reason: 'disabled',
      exited_at: '2026-11-02T14:10:00+00:00',
    },
  },
});
