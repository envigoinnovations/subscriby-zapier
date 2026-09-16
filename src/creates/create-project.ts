import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_project',
  noun: 'Project',
  display: {
    label: 'Create Project',
    description:
      'Create a new Subscriby project. Delegates to the REST v1 endpoint — plan limits, the custom_handle tier gate, and cache invalidation all run server-side.',
  },
  operation: {
    inputFields: [
      { key: 'name', label: 'Name', type: 'string', required: true, helpText: 'Project name, 5-255 characters.' },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'Max 1000 characters. HTML is filtered server-side.' },
      {
        key: 'handle',
        label: 'Handle',
        type: 'string',
        required: false,
        helpText: 'URL-friendly slug; alpha-dash lowercase, 5-255 chars. Requires a Starter or Growth Subscriby tier — Free-tier tokens get TEAM_TIER_REQUIRED if supplied.',
      },
      { key: 'terms', label: 'Terms URL', type: 'string', required: false, helpText: 'Optional URL to the terms page. Max 255 characters.' },
      { key: 'privacy', label: 'Privacy URL', type: 'string', required: false, helpText: 'Optional URL to the privacy page. Max 255 characters.' },
      { key: 'metrics', label: 'Aggregated Metrics', type: 'boolean', required: false, helpText: 'Opt into aggregated metrics collection on this project.' },
      { key: 'active', label: 'Active', type: 'boolean', required: false, helpText: 'Defaults to true. Set false to create in draft state.' },
      { key: 'team_id', label: 'Team ID', type: 'string', required: false, dynamic: 'dropdown_teams.id.name', helpText: 'UUID of the owning team. Defaults to the token\'s scoped team.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const body: Record<string, unknown> = {
        name: bundle.inputData.name,
      };

      const passthrough: Array<keyof typeof bundle.inputData> = [
        'description',
        'handle',
        'terms',
        'privacy',
        'metrics',
        'active',
        'team_id',
      ];

      for (const key of passthrough) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key as string] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects`,
        method: 'POST',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      name: 'Research Premium',
      handle: 'research-premium',
      type: 'telegram',
      active: true,
    },
  },
} satisfies Create;