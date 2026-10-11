import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_link',
  noun: 'Smart Link',
  display: {
    label: 'Get Smart Link',
    description:
      'Retrieve one Smart Link by UUID: its name, address, stable code, destination, the three addresses to share (web, bot, embed page), its state and its lifetime clicks. Get Smart Link Funnel has the members and the revenue behind it.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      {
        key: 'link_id',
        label: 'Smart Link ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the link. Find it with Find Smart Links.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const linkId = bundle.inputData.link_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/links/${linkId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: '7c2e5a90-3f41-4b8d-9e62-1a0d4c8b7f35',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      name: 'YouTube description',
      slug: 'youtube',
      code: 'K7PMQ2X',
      destination: { type: 'plan', plan_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80', plan_name: 'Premium' },
      urls: {
        web: 'https://my.subscriby.net/jane/go/youtube',
        bot: 'https://t.me/JaneBot?start=via_K7PMQ2X',
        embed: 'https://my.subscriby.net/jane/embed/plans?via=K7PMQ2X',
      },
      state: 'live',
      expires_at: null,
      archived_at: null,
      clicks: { total: 48, last_at: '2026-11-21T09:58:12+00:00' },
      created_at: '2026-11-20T09:14:02+00:00',
      updated_at: '2026-11-21T10:02:40+00:00',
    },
  },
} satisfies Search;
