import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'restore_project',
  noun: 'Project',
  display: {
    label: 'Restore Project',
    description: 'Flip a previously archived project back to active. Emits project.restored. Noop if already active.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${bundle.inputData.project_id as string}/restore`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: { id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13', active: true },
  },
} satisfies Create;