import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_lead_created',
  noun: 'Member',
  label: 'Member Lead Created',
  description:
    'Triggers when a new lead arrives in a project: a first message to the project bot, a Smart Link, a referral link, a portal sign-in or a support message created the member row without a purchase. Fires once per member, with the door they came through and the Smart Link credited when one brought them; an account adopted from a sibling project or restored by a backfill is not an arrival.',
  event: 'member.lead_created',
  sample: {
    id: 'evt_01HXEXAMPLELEAD00000000001',
    type: 'member.lead_created',
    created_at: '2026-11-01T09:12:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      source: 'bot',
      smart_link_id: '9d3b6f1a-2c7e-4a58-b0f4-6e1c8d2a7b35',
      created_at: '2026-11-01T09:12:00+00:00',
    },
  },
});
