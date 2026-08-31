import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'cancel_team_invitation',
  noun: 'Team Member',
  display: {
    label: 'Cancel Team Invitation',
    description:
      'Withdraw an invitation nobody has accepted yet, so its link stops working. Distinct from Remove Team Member: an invitee has no membership row, only a pending invitation, and the two fail on different things.',
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
      { key: 'invitation_id', label: 'Invitation ID', type: 'string', required: true, helpText: 'UUID of the pending invitation to withdraw.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const { team_id: teamId, invitation_id: invitationId } = bundle.inputData as Record<string, string>;

      const response = await z.request({
        url: `${apiBaseUrl()}/teams/${teamId}/invitations/${invitationId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { team_id: teamId, invitation_id: invitationId, cancelled: true };
    },
    sample: {
      team_id: '01HXTEAMSAMPLE0000000000000',
      invitation_id: '01HXINVITESAMPLE00000000000',
      cancelled: true,
    },
  },
} satisfies Create;
