import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'invite_team_member',
  noun: 'Team Member',
  display: {
    label: 'Invite Team Member',
    description:
      'Invite someone to a team by email and send them an invitation. Addressed by email rather than user ID because the invitee may not have an account yet. The role must already exist on the team — create it first with Create Role. Someone already in the team is refused.',
  },
  operation: {
    inputFields: [
      {
        key: 'team_id',
        label: 'Team',
        type: 'string',
        required: true,
        dynamic: 'dropdown_teams.id.name',
        helpText: 'UUID of the team to invite into.',
      },
      { key: 'email', label: 'Email', type: 'string', required: true, helpText: 'Email address of the person being invited.' },
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
        url: `${apiBaseUrl()}/teams/${bundle.inputData.team_id}/members`,
        method: 'POST',
        body: {
          email: bundle.inputData.email,
          role: bundle.inputData.role,
        },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      team_id: '01HXTEAMSAMPLE0000000000000',
      email: 'newcomer@example.com',
      role: 'support-agent',
      status: 'invited',
    },
  },
} satisfies Create;
