import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'archive_project',
  noun: 'Project',
  display: {
    label: 'Archive Project',
    description: 'Flip a project to active=false. Emits project.archived. Noop if already archived.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${bundle.inputData.project_id as string}/archive`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: { id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13', active: false },
  },
} satisfies Create;