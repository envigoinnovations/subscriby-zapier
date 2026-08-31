import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'delete_project',
  noun: 'Project',
  display: {
    label: 'Delete Project',
    description:
      'Permanently delete a Subscriby project. Subscribers, plans, resources, and access codes are removed server-side.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the project to delete.',
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { id: projectId, deleted: true };
    },
    sample: {
      id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      deleted: true,
    },
  },
} satisfies Create;
