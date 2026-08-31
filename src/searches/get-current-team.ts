import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_current_team',
  noun: 'Team',
  display: {
    label: 'Get Current Team',
    description: 'Retrieve the team the authenticated token is scoped to.',
  },
  operation: {
    inputFields: [
      {
        key: 'refresh',
        label: 'Refresh',
        type: 'boolean',
        required: false,
        helpText: 'Ignored — present because Zapier requires every search to accept at least one input field. Leave blank.',
      },
    ],
    async perform(z: ZObject, _bundle: Bundle) {
      const response = await z.request({
        url: `${apiBaseUrl()}/teams/current`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
      name: 'Creator Team',
    },
  },
} satisfies Search;
