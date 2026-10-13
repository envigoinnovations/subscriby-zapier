import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'sequence_deleted',
  noun: 'Sequence',
  label: 'Sequence Deleted',
  description:
    'Triggers when a creator deletes a recovery sequence. Every member part-way through it is let go first (each firing Sequence Exited with the reason "deleted"), the messages already sent stay in the activity ledger, and the payload carries the final snapshot with its deletion time set.',
  event: 'sequence.deleted',
  sample: {
    id: 'evt_01HXEXAMPLESEQUENCE000003',
    type: 'sequence.deleted',
    created_at: '2026-11-02T14:10:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      sequence: {
        id: '3e9a7c21-5d84-4f06-b2c1-8a7e5d4f9b02',
        name: 'Win-back after churn',
        trigger: 'churned',
        active: true,
        steps: [
          { id: '6b1f3d58-9c2a-4e7d-a0f4-2d8c7b5e1a93', position: 1, delay_days: 3, coupon_id: null },
          { id: '9d4e2a07-1b6c-4f58-8e3a-5c7f0d2b9e41', position: 2, delay_days: 7, coupon_id: 'c2d8e4f1-7a3b-4c9d-b5e6-1f0a9d8c7b65' },
        ],
        created_at: '2026-10-22T09:30:00+00:00',
        updated_at: '2026-11-02T14:10:00+00:00',
        deleted_at: '2026-11-02T14:10:00+00:00',
      },
    },
  },
});
