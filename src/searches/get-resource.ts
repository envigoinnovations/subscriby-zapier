import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_resource',
  noun: 'Resource',
  display: {
    label: 'Get Resource',
    description: 'Retrieve a single project resource by UUID: its kind (manual or connector:kind), connector, the place it is bound to, title, description and switch.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'resource_id', label: 'Resource ID', type: 'string', required: true, dynamic: 'dropdown_resources.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const resourceId = bundle.inputData.resource_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/${resourceId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
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
