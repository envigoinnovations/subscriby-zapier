import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'unlink_resource',
  noun: 'Resource',
  display: {
    label: 'Unlink Resource',
    description:
      'Detach the place from a project resource. The row remains and keeps its kind and connector; it is bound to no space until the creator links another through the connector.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the owning project.',
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      {
        key: 'resource_id',
        label: 'Resource ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the project resource to unlink.',
        dynamic: 'dropdown_resources.id.name',
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
      id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      kind: 'telegram:channel',
      connector: 'telegram',
      space: null,
      title: 'Premium Channel',
      description: null,
      active: true,
      created_at: '2026-05-18T10:05:00Z',
      updated_at: '2026-09-06T08:30:12Z',
    },
  },
} satisfies Create;
