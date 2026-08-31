import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'delete_team',
  noun: 'Team',
  display: {
    label: 'Delete Team',
    description:
      'Permanently delete a Subscriby team, owner only. Every project, plan and subscription scoped to the team goes with it and there is no restore. Your last remaining team is refused — an account with no tenant is not a valid state.',
  },
  operation: {
    inputFields: [
      {
        key: 'team_id',
        label: 'Team',
        type: 'string',
        required: true,
        dynamic: 'dropdown_teams.id.name',
        helpText: 'UUID of the team to delete. This cannot be undone.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const teamId = bundle.inputData.team_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/teams/${teamId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { id: teamId, deleted: true };
    },
    sample: {
      id: '01HXTEAMSAMPLE0000000000000',
      deleted: true,
    },
  },
} satisfies Create;
