import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_role',
  noun: 'Role',
  display: {
    label: 'Create Role',
    description:
      'Create a permission role inside a team. The code is the stable identifier permissions are addressed by — it must be unique within the team and cannot be changed later. Growth-tier feature.',
  },
  operation: {
    inputFields: [
      {
        key: 'team_id',
        label: 'Team',
        type: 'string',
        required: true,
        dynamic: 'dropdown_teams.id.name',
        helpText: 'UUID of the team the role belongs to.',
      },
      {
        key: 'code',
        label: 'Code',
        type: 'string',
        required: true,
        helpText: 'Stable identifier, letters/numbers/dashes only. Unique per team and immutable once created.',
      },
      { key: 'name', label: 'Name', type: 'string', required: true, helpText: 'Human-readable role name.' },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'Optional note on what the role is for.' },
      {
        key: 'permissions',
        label: 'Permissions',
        type: 'string',
        required: false,
        list: true,
        helpText: 'Permission codes in entity:action form, for example project:view-any. Leave empty for a role that grants nothing yet.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const body: Record<string, unknown> = {
        team_id: bundle.inputData.team_id,
        code: bundle.inputData.code,
        name: bundle.inputData.name,
      };

      if (bundle.inputData.description) {
        body.description = bundle.inputData.description;
      }

      if (Array.isArray(bundle.inputData.permissions) && bundle.inputData.permissions.length > 0) {
        body.permissions = bundle.inputData.permissions;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/roles`,
        method: 'POST',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '01HXROLESAMPLE0000000000000',
      team_id: '01HXTEAMSAMPLE0000000000000',
      code: 'support-agent',
      name: 'Support Agent',
      permissions: ['support-conversation:view-any', 'support-conversation:update'],
    },
  },
} satisfies Create;
