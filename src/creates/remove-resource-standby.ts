import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'remove_resource_standby',
  noun: 'Resource Standby',
  display: {
    label: 'Remove Resource Standby',
    description:
      'Stop keeping a standby for one resource; the chat itself is untouched and the resource keeps its live chat.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, helpText: 'The project the route is keyed under.', dynamic: 'dropdown_projects.id.name' },
      { key: 'resource_id', label: 'Resource Id', type: 'string', required: true, helpText: 'UUID of the resource whose standby to remove.', dynamic: 'dropdown_resources.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const resourceId = bundle.inputData.resource_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/${resourceId}/standby`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { status: 'ok' };
    },
    sample: {
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      standby: null,
    },
  },
} satisfies Create;
