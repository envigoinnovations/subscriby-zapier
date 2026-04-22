import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_resources',
  noun: 'Resource',
  display: {
    label: 'List Resources',
    description: 'List every resource attached to a project.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources`,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'res_01HXRESOURCESAMPLE00000000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      type: 'telegram_channel',
      title: 'Premium Channel',
    },
  },
} satisfies Search;
