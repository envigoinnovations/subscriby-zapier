import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_resource',
  noun: 'Resource',
  display: {
    label: 'Get Resource',
    description: 'Retrieve a single project resource by UUID.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true },
      { key: 'resource_id', label: 'Resource ID', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const resourceId = bundle.inputData.resource_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/${resourceId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: 'res_01HXRESOURCESAMPLE00000000',
      project_id: 'prj_01HXPROJECTSAMPLE000000000',
      type: 'telegram_channel',
      title: 'Premium Channel',
    },
  },
} satisfies Search;
