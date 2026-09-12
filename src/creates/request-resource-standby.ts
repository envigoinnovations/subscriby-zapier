import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'request_resource_standby',
  noun: 'Resource Standby',
  display: {
    label: 'Request Resource Standby',
    description:
      'Ask the creator, through the connector, to pick the chat that becomes the standby for one resource. Nothing is linked by the call itself.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, helpText: 'The project the route is keyed under.', dynamic: 'dropdown_projects.id.name' },
      { key: 'resource_id', label: 'Resource Id', type: 'string', required: true, helpText: 'UUID of the resource that should get a standby.', dynamic: 'dropdown_resources.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const resourceId = bundle.inputData.resource_id as string;
      const body: Record<string, unknown> = {};

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/${resourceId}/standby/request`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
        body,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
    },
    sample: {
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      status: 'request_sent',
    },
  },
} satisfies Create;
