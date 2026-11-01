import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_project',
  noun: 'Project',
  display: {
    label: 'Update Project',
    description:
      'Partial-update an existing Subscriby project. Only fields you supply are changed; omitted fields keep their current value. Handle uniqueness is enforced server-side, and a changed handle keeps the old address redirecting.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'name', label: 'Name', type: 'string', required: false, helpText: '5-255 characters.' },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'Max 1000 characters. HTML filtered server-side.' },
      { key: 'handle', label: 'Handle', type: 'string', required: false, helpText: 'URL slug (alpha-dash lowercase, 5-255), unique across every project\'s current and former handles, on every tier. Changing it moves the portal URL at once; the old address keeps redirecting.' },
      { key: 'terms', label: 'Terms URL', type: 'string', required: false },
      { key: 'privacy', label: 'Privacy URL', type: 'string', required: false },
      {
        key: 'storefront_arrangement',
        label: 'Storefront Arrangement',
        type: 'string',
        required: false,
        choices: { manual: 'Manual (the pinned order)', live: 'Live (what is on now first)' },
        helpText:
          'How the portal, the embed and the bot order the plans on offer. Live puts the passes and seasons whose access is on now first, then those opening soonest, then the pinned order; it needs the owner\'s time-limited passes capability (Growth, or the Passes Addon) and is refused with TEAM_TIER_REQUIRED without it.',
      },
      { key: 'active', label: 'Active', type: 'boolean', required: false },
      { key: 'hide_branding', label: 'Remove Subscriby Branding', type: 'boolean', required: false, helpText: 'Takes the "Powered by Subscriby" mark off the portal page, its social card and the bot. Off by default on every plan; turning it on needs a Starter or Growth tier — Free-tier tokens get TEAM_TIER_REQUIRED.' },
      { key: 'team_id', label: 'Team ID', type: 'string', required: false, dynamic: 'dropdown_teams.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {};
      const passthrough: Array<keyof typeof bundle.inputData> = [
        'name',
        'description',
        'handle',
        'terms',
        'privacy',
        'storefront_arrangement',
        'active',
        'hide_branding',
        'team_id',
      ];

      for (const key of passthrough) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key as string] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}`,
        method: 'PATCH',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      name: 'Research Premium (Renamed)',
      handle: 'research-premium',
      active: true,
    },
  },
} satisfies Create;