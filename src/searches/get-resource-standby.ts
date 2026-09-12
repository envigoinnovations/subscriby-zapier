import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_resource_standby',
  noun: 'Resource Standby',
  display: {
    label: 'Get Resource Standby',
    description:
      'Read the standby kept for one resource — its health, whether posts are mirrored into it, and when it was last probed and written to.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, helpText: 'The project the route is keyed under.', dynamic: 'dropdown_projects.id.name' },
      { key: 'resource_id', label: 'Resource Id', type: 'string', required: true, helpText: 'UUID of the resource whose standby to read.', dynamic: 'dropdown_resources.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const resourceId = bundle.inputData.resource_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/${resourceId}/standby`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      mirror_enabled: true,
      health_status: 'healthy',
      health_status_label: 'Healthy',
      health_reason: null,
      health_checked_at: '2026-09-12T02:00:00Z',
      last_mirrored_at: '2026-09-12T01:45:12Z',
      linked_at: '2026-09-01T14:22:09Z',
    },
  },
} satisfies Search;
