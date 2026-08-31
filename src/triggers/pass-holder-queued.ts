import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_holder_queued',
  noun: 'Pass Holder',
  label: 'Pass Holder Queued',
  description:
    "Triggers when a pass holder taps their invite link for a window that has not opened yet. Their join request is held and they will be admitted automatically when it opens — this is the moment a buyer stops being a risk. A holder who never taps produces no event at all.",
  event: 'pass.holder_queued',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.holder_queued',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
          subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
          subscriber_id: '6f9b2e37-c184-4a05-8d72-30e16bc9f458',
          plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
          plan_kind: 'pass',
          window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
          source_plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
          starts_at: '2026-09-20T13:00:00Z',
          ends_at: '2026-09-21T03:00:00Z'
    },
  },
});
