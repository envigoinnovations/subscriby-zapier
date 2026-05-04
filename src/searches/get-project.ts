import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_project',
  noun: 'Project',
  display: {
    label: 'Get Project',
    description: 'Retrieve a single project by its UUID.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: 'prj_01HXPROJECTSAMPLE000000000',
      name: 'Research Premium',
      handle: 'research-premium',
    },
  },
} satisfies Search;
