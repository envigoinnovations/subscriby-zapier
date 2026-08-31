import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'remove_team_member',
  noun: 'Team Member',
  display: {
    label: 'Remove Team Member',
    description:
      'Remove a collaborator from a team. They immediately lose access to every project and setting scoped to it, though their own account is untouched. The team owner cannot be removed. To withdraw an invitation nobody has accepted, use Cancel Team Invitation instead.',
  },
  operation: {
    inputFields: [
      {
        key: 'team_id',
        label: 'Team',
        type: 'string',
        required: true,
        dynamic: 'dropdown_teams.id.name',
        helpText: 'UUID of the team.',
      },
      { key: 'user_id', label: 'Member User ID', type: 'string', required: true, helpText: 'UUID of the collaborator to remove.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const { team_id: teamId, user_id: userId } = bundle.inputData as Record<string, string>;

      const response = await z.request({
        url: `${apiBaseUrl()}/teams/${teamId}/members/${userId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { team_id: teamId, user_id: userId, removed: true };
    },
    sample: {
      team_id: '01HXTEAMSAMPLE0000000000000',
      user_id: '01HXUSERSAMPLE0000000000000',
      removed: true,
    },
  },
} satisfies Create;
