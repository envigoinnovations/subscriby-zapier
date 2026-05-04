import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_team_members',
  noun: 'Team Member',
  display: {
    label: 'List Team Members',
    description: 'List every collaborator attached to a team.',
  },
  operation: {
    inputFields: [
      { key: 'team_id', label: 'Team ID', type: 'string', required: true, dynamic: 'dropdown_teams.id.name', altersDynamicFields: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const teamId = bundle.inputData.team_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/teams/${teamId}/members`,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: 'usr_01HXUSERSAMPLE0000000000000',
      name: 'Jane Doe',
      email: 'jane@example.com',
    },
  },
} satisfies Search;
