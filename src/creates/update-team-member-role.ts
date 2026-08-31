import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_team_member_role',
  noun: 'Team Member',
  display: {
    label: 'Change Team Member Role',
    description:
      'Move an existing collaborator onto a different role. The team owner cannot be re-roled — ownership is not a membership row — and someone who is not in the team is refused. Fires the Team Member Role Changed trigger.',
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
      { key: 'user_id', label: 'Member User ID', type: 'string', required: true, helpText: 'UUID of the collaborator whose role is changing.' },
      {
        key: 'role',
        label: 'Role Code',
        type: 'string',
        required: true,
        helpText: 'Code of an existing role on that team, for example support-agent. Not the role UUID.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const response = await z.request({
        url: `${apiBaseUrl()}/teams/${bundle.inputData.team_id}/members/${bundle.inputData.user_id}/role`,
        method: 'PATCH',
        body: { role: bundle.inputData.role },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '01HXUSERSAMPLE0000000000000',
      team_id: '01HXTEAMSAMPLE0000000000000',
      name: 'Alex Doe',
      role_id: '01HXROLESAMPLE0000000000000',
      is_owner: false,
    },
  },
} satisfies Create;
