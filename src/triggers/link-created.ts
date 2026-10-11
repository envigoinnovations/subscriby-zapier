import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'link_created',
  noun: 'Smart Link',
  label: 'New Smart Link',
  description:
    'Triggers when a Smart Link is created on a project: a tracked address for one channel (a video description, a bio, a flyer\'s QR). "link.url" is the web address and "link.code" the stable code the bot link and the attribution cookie carry; the code never changes, the slug may.',
  event: 'link.created',
  sample: {
    id: 'evt_01HXEXAMPLELINK000000001',
    type: 'link.created',
    created_at: '2026-11-20T09:14:02Z',
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
        archived_at: null,
        clicks_total: 0,
      },
    },
  },
});
