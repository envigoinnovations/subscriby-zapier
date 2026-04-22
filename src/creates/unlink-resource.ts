import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'unlink_resource',
  noun: 'Resource',
  display: {
    label: 'Unlink Resource',
    description:
      'Detach a Telegram destination (channel / group / supergroup) from a project resource. The row remains; only the link is dropped.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the owning project.',
      },
      {
        key: 'resource_id',
        label: 'Resource ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the project resource to unlink.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const resourceId = bundle.inputData.resource_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/${resourceId}/unlink`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: 'res_01HXRESOURCESAMPLE00000000',
      unlinked: true,
    },
  },
} satisfies Create;
