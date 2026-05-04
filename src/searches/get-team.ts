import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_team',
  noun: 'Team',
  display: {
    label: 'Get Team',
    description: 'Retrieve a single team by UUID.',
  },
  operation: {
    inputFields: [
      { key: 'team_id', label: 'Team ID', type: 'string', required: true, dynamic: 'dropdown_teams.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const teamId = bundle.inputData.team_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/teams/${teamId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: 'tem_01HXTEAMSAMPLE0000000000000',
      name: 'Creator Team',
    },
  },
} satisfies Search;
