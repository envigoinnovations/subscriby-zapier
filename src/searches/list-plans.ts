import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_plans',
  noun: 'Plan',
  display: {
    label: 'List Plans',
    description: 'List every plan within a project.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      if (!projectId) {
        return [];
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/plans`,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'pln_01HXPLANSAMPLE0000000000000',
      name: 'Premium Monthly',
      price: '29.00',
    },
  },
} satisfies Search;
