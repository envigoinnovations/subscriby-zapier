import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_link',
  noun: 'Smart Link',
  display: {
    label: 'Create Smart Link',
    description:
      'Create a Smart Link on a project: a tracked address for one channel (a video description, a bio, a flyer\'s QR). Every click is counted and every member who signs in within thirty days of clicking is credited to the link. Answers the three addresses to share: the web address, the bot deep link and the embed page. On every plan.',
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
        key: 'name',
        label: 'Name',
        type: 'string',
        required: true,
        helpText: '2–120 characters. For your own records — visitors never see it, e.g. "YouTube description".',
      },
      {
        key: 'slug',
        label: 'Address',
        type: 'string',
        required: true,
        helpText:
          'The segment after /go/ in the web address: 2–32 letters, digits and hyphens, e.g. "youtube". Lowercased and unique per project; go, embed, portal, bot, direct, new and edit are reserved. You can rename it later — the code behind the link never changes.',
      },
      {
        key: 'destination',
        label: 'Destination',
        type: 'string',
        required: true,
        choices: { portal: 'Portal home', plan: 'One plan\'s checkout', bot: 'The project\'s bot' },
        helpText: 'Where the link sends people. A plan destination needs Plan ID; a bot destination lands on the portal home while no bot is connected.',
      },
      {
        key: 'plan_id',
        label: 'Plan ID',
        type: 'string',
        required: false,
        dynamic: 'dropdown_plans.id.name',
        helpText: 'The plan a "One plan\'s checkout" destination opens. Refused on the other destinations.',
      },
      {
        key: 'expires_at',
        label: 'Expires At',
        type: 'datetime',
        required: false,
        helpText: 'When the link stops counting and crediting; must be in the future. Leave blank to run until archived. The address keeps landing on the portal home afterwards.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {
        name: bundle.inputData.name,
        slug: bundle.inputData.slug,
        destination: bundle.inputData.destination,
      };

      for (const key of ['plan_id', 'expires_at'] as const) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/links`,
        method: 'POST',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
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
      clicks: { total: 0, last_at: null },
      created_at: '2026-11-20T09:14:02+00:00',
      updated_at: '2026-11-20T09:14:02+00:00',
    },
  },
} satisfies Create;
