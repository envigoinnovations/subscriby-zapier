import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_bot_status',
  noun: 'Bot',
  display: {
    label: 'Get Bot Status',
    description: 'Retrieve the current Telegram bot connection / health status for a project.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/bot`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: '5e93b1d7-4a20-4c68-8f51-9b0d27e6a34c',
      username: 'research_premium_bot',
      connected: true,
    },
  },
} satisfies Search;
