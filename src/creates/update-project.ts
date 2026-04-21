import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_project',
  noun: 'Project',
  display: {
    label: 'Update Project',
    description:
      'Partial-update an existing MemberPass project. Only fields you supply are changed; omitted fields keep their current value. Handle uniqueness and custom_handle tier gate are enforced server-side.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true },
      { key: 'name', label: 'Name', type: 'string', required: false, helpText: '5-255 characters.' },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'Max 1000 characters. HTML filtered server-side.' },
      { key: 'handle', label: 'Handle', type: 'string', required: false, helpText: 'URL slug (alpha-dash lowercase, 5-255). Requires Starter or Growth tier.' },
      { key: 'terms', label: 'Terms URL', type: 'string', required: false },
      { key: 'privacy', label: 'Privacy URL', type: 'string', required: false },
      { key: 'metrics', label: 'Aggregated Metrics', type: 'boolean', required: false },
      { key: 'active', label: 'Active', type: 'boolean', required: false },
      { key: 'bot_id', label: 'Telegram Bot ID', type: 'string', required: false },
      { key: 'team_id', label: 'Team ID', type: 'string', required: false },
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
        'metrics',
        'active',
        'bot_id',
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
      id: 'prj_01HXPROJECTSAMPLE000000000',
      name: 'Research Premium (Renamed)',
      handle: 'research-premium',
      active: true,
    },
  },
} satisfies Create;