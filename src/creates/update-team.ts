import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_team',
  noun: 'Team',
  display: {
    label: 'Update Team',
    description:
      'Rename a Subscriby team. Owner only — belonging to a team is not enough. Name is the only mutable field; membership and roles move through their own actions.',
  },
  operation: {
    inputFields: [
      {
        key: 'team_id',
        label: 'Team',
        type: 'string',
        required: true,
        dynamic: 'dropdown_teams.id.name',
        helpText: 'UUID of the team to rename.',
      },
      { key: 'name', label: 'Name', type: 'string', required: true, helpText: 'New team name, up to 255 characters.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const response = await z.request({
        url: `${apiBaseUrl()}/teams/${bundle.inputData.team_id}`,
        method: 'PATCH',
        body: { name: bundle.inputData.name },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '01HXTEAMSAMPLE0000000000000',
      name: 'Agency Team Renamed',
      owner_user_id: '01HXUSERSAMPLE0000000000000',
      personal: false,
    },
  },
} satisfies Create;
