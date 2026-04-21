import { ZObject, Bundle } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_project',
  noun: 'Project',
  display: {
    label: 'Create Project',
    description: 'Create a new MemberPass project. Delegates to the REST v1 endpoint and enforces plan limits.',
  },
  operation: {
    inputFields: [
      { key: 'name', label: 'Name', type: 'string', required: true, helpText: 'Project name, 5-255 characters.' },
      { key: 'description', label: 'Description', type: 'text', required: false },
      { key: 'handle', label: 'Handle', type: 'string', required: false, helpText: 'URL-friendly slug; alpha-dash lowercase.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const response = await z.request({
        url: `${apiBaseUrl()}/projects`,
        method: 'POST',
        body: {
          name: bundle.inputData.name,
          description: bundle.inputData.description ?? null,
          handle: bundle.inputData.handle ?? null,
        },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: 'prj_01HXPROJECTSAMPLE000000000',
      name: 'Research Premium',
      handle: 'research-premium',
    },
  },
};
