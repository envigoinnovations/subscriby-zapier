import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_group',
  noun: 'Group',
  display: {
    label: 'Create Group',
    description:
      'Create a permission group inside a team. A role is what one collaborator is; a group is a named bundle several people can be put into. Membership is set separately with Sync Group Members. Growth-tier feature.',
  },
  operation: {
    inputFields: [
      {
        key: 'team_id',
        label: 'Team',
        type: 'string',
        required: true,
        dynamic: 'dropdown_teams.id.name',
        helpText: 'UUID of the team the group belongs to.',
      },
      {
        key: 'code',
        label: 'Code',
        type: 'string',
        required: true,
        helpText: 'Stable identifier, letters/numbers/dashes only. Unique per team and immutable once created.',
      },
      { key: 'name', label: 'Name', type: 'string', required: true, helpText: 'Human-readable group name.' },
      {
        key: 'permissions',
        label: 'Permissions',
        type: 'string',
        required: false,
        list: true,
        helpText: 'Permission codes in entity:action form, for example project:view-any.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const body: Record<string, unknown> = {
        team_id: bundle.inputData.team_id,
        code: bundle.inputData.code,
        name: bundle.inputData.name,
      };

      if (Array.isArray(bundle.inputData.permissions) && bundle.inputData.permissions.length > 0) {
        body.permissions = bundle.inputData.permissions;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/groups`,
        method: 'POST',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '01HXGROUPSAMPLE000000000000',
      team_id: '01HXTEAMSAMPLE0000000000000',
      code: 'billing-team',
      name: 'Billing Team',
      permissions: ['project-subscription:view-any'],
    },
  },
} satisfies Create;
