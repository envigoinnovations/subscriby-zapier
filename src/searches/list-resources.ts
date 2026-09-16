import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_resources',
  noun: 'Resource',
  display: {
    label: 'List Resources',
    description: 'List every resource attached to a project, or only those of one kind (manual, telegram:channel) or on one connector.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'kind', label: 'Kind', type: 'string', required: false, dynamic: 'dropdown_resource_kinds.id.name', helpText: 'Only resources of one kind: pick one of the kinds the project\'s connected connectors gate, or type manual for the perks the creator hands over by hand.' },
      { key: 'connector', label: 'Connector', type: 'string', required: false, dynamic: 'dropdown_connectors.id.name', helpText: 'Only the resources one connector gates.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const params: Record<string, string> = {};

      for (const key of ['kind', 'connector'] as const) {
        const value = bundle.inputData[key];
        if (typeof value === 'string' && value !== '') {
          params[key] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      kind: 'telegram:channel',
      connector: 'telegram',
      space: {
        id: '3c1f7a58-2b6e-4d90-8f41-6a2e9c5d7b10',
        external_id: '-1001234567890',
        title: 'Premium Channel',
      },
      title: 'Premium Channel',
      description: null,
      active: true,
      created_at: '2026-05-18T10:05:00Z',
      updated_at: '2026-05-18T10:05:00Z',
    },
  },
} satisfies Search;
