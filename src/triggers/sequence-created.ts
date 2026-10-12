import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'sequence_created',
  noun: 'Sequence',
  label: 'Sequence Created',
  description:
    'Triggers when a creator builds a sequence: the ordered messages a member receives on the days the creator chose after one of four moments (they left, they arrived as a lead, their checkout stalled, their trial is about to end), each with the way to the plan and, optionally, a coupon. The payload carries the sequence snapshot with its steps (none yet on this event).',
  event: 'sequence.created',
  sample: {
    id: 'evt_01HXEXAMPLESEQUENCE000001',
    type: 'sequence.created',
    created_at: '2026-10-22T09:30:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      sequence: {
        id: '3e9a7c21-5d84-4f06-b2c1-8a7e5d4f9b02',
        name: 'Win-back after churn',
        trigger: 'churned',
        active: true,
        steps: [],
        created_at: '2026-10-22T09:30:00+00:00',
        updated_at: '2026-10-22T09:30:00+00:00',
        deleted_at: null,
      },
    },
  },
});
