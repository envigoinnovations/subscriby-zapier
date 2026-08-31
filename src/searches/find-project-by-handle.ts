import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_project_by_handle',
  noun: 'Project',
  display: {
    label: 'Find Project by Handle',
    description: 'Look up a project by its URL handle (e.g. "research-premium").',
  },
  operation: {
    inputFields: [
      { key: 'handle', label: 'Handle', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const handle = bundle.inputData.handle as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects`,
        params: { 'filter[handle]': handle },
      });

      handleHttpError(response, z);

      const data = ((response.data as { data?: unknown[] }).data ?? []) as Array<{ handle: string }>;

      return data.filter((row) => row.handle === handle);
    },
    sample: {
      id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      name: 'Research Premium',
      handle: 'research-premium',
    },
  },
} satisfies Search;