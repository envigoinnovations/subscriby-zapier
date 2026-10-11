import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'link_archived',
  noun: 'Smart Link',
  label: 'Smart Link Archived',
  description:
    'Triggers when a Smart Link is put out of use. Its address keeps landing on the portal home without counting, and the members, purchases and payments it brought keep their figures; an archived link is never put back in use.',
  event: 'link.archived',
  sample: {
    id: 'evt_01HXEXAMPLELINK000000003',
    type: 'link.archived',
    created_at: '2026-12-01T08:30:11Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      link: {
        id: '7c2e5a90-3f41-4b8d-9e62-1a0d4c8b7f35',
        name: 'YouTube description',
        slug: 'youtube',
        code: 'K7PMQ2X',
        destination: 'plan',
        plan_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
        url: 'https://my.subscriby.net/jane/go/youtube',
        expires_at: null,
        archived_at: '2026-12-01T08:30:11+00:00',
        clicks_total: 1204,
      },
    },
  },
});
