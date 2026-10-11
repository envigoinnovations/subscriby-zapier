import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'link_updated',
  noun: 'Smart Link',
  label: 'Smart Link Updated',
  description:
    'Triggers when a Smart Link\'s name, address, destination or expiry changes. "changes" names each field that moved with its old and new value; a rename moves "slug" and "url" but never "code", so a printed QR or a shared bot link keeps attributing.',
  event: 'link.updated',
  sample: {
    id: 'evt_01HXEXAMPLELINK000000002',
    type: 'link.updated',
    created_at: '2026-11-21T10:02:40Z',
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
        clicks_total: 48,
      },
      changes: {
        slug: { from: 'yt', to: 'youtube' },
        url: { from: 'https://my.subscriby.net/jane/go/yt', to: 'https://my.subscriby.net/jane/go/youtube' },
      },
    },
  },
});
