import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_team_member',
  noun: 'Team Member',
  display: {
    label: 'Get Team Member',
    description: 'Retrieve a single team member by team ID + user ID.',
  },
  operation: {
    inputFields: [
      { key: 'team_id', label: 'Team ID', type: 'string', required: true },
      { key: 'user_id', label: 'User ID', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const teamId = bundle.inputData.team_id as string;
      const userId = bundle.inputData.user_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/teams/${teamId}/members/${userId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: 'usr_01HXUSERSAMPLE0000000000000',
      name: 'Jane Doe',
      email: 'jane@example.com',
    },
  },
} satisfies Search;
