import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_link',
  noun: 'Smart Link',
  display: {
    label: 'Update Smart Link',
    description:
      'Partial-update a Smart Link. Only the fields you fill in change; blank fields keep their value. Renaming the address moves the web address and nothing else — the code, the bot link and the attribution cookie survive every edit.',
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
      { key: 'name', label: 'Name', type: 'string', required: false, helpText: '2–120 characters.' },
      {
        key: 'slug',
        label: 'Address',
        type: 'string',
        required: false,
        helpText: 'A new segment after /go/, 2–32 letters, digits and hyphens, lowercased and unique per project. The old address stops answering.',
      },
      {
        key: 'destination',
        label: 'Destination',
        type: 'string',
        required: false,
        choices: { portal: 'Portal home', plan: 'One plan\'s checkout', bot: 'The project\'s bot' },
        helpText: 'A plan destination needs Plan ID, sent here or already stored. Leaving a plan destination drops the stored plan.',
      },
      {
        key: 'plan_id',
        label: 'Plan ID',
        type: 'string',
        required: false,
        dynamic: 'dropdown_plans.id.name',
        helpText: 'The plan a "One plan\'s checkout" destination opens.',
      },
      {
        key: 'expires_at',
        label: 'Expires At',
        type: 'datetime',
        required: false,
        helpText: 'When the link stops counting; must be in the future. Leave blank to keep the stored value; tick Clear Expiry to remove it.',
      },
      {
        key: 'clear_expires_at',
        label: 'Clear Expiry',
        type: 'boolean',
        required: false,
        helpText: 'Set true to remove the expiry so the link runs until archived. A blank Expires At alone keeps the stored value.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const linkId = bundle.inputData.link_id as string;

      const body: Record<string, unknown> = {};

      for (const key of ['name', 'slug', 'destination', 'plan_id', 'expires_at'] as const) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value;
        }
      }

      if (bundle.inputData.clear_expires_at === true || bundle.inputData.clear_expires_at === 'true') {
        body.expires_at = null;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/links/${linkId}`,
        method: 'PATCH',
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
      clicks: { total: 48, last_at: '2026-11-21T09:58:12+00:00' },
      created_at: '2026-11-20T09:14:02+00:00',
      updated_at: '2026-11-21T10:02:40+00:00',
    },
  },
} satisfies Create;
