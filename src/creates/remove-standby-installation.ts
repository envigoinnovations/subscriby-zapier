import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'remove_standby_installation',
  noun: 'Standby Installation',
  display: {
    label: 'Remove Standby Installation',
    description:
      'Stop keeping the standby installation (the spare bot) registered for a project.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project Id', type: 'string', required: true, helpText: 'UUID of the project whose standby installation to remove.', dynamic: 'dropdown_projects.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/recovery/standby-installation`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { status: 'ok' };
    },
    sample: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      standby_installation_registered: false,
    },
  },
} satisfies Create;
