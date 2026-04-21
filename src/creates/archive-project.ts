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
      { key: 'project_id', label: 'Project ID', type: 'string', required: true },
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
    sample: { id: 'prj_01HXPROJECTSAMPLE000000000', active: false },
  },
} satisfies Create;