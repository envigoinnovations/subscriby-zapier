import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_role',
  noun: 'Role',
  display: {
    label: 'Update Role',
    description:
      'Rename a role and replace its permissions. Permissions REPLACE the existing set rather than adding to it — send the full list you want the role to end up with, or leave the field empty to keep the current one. The code cannot be changed.',
  },
  operation: {
    inputFields: [
      {
        key: 'role_id',
        label: 'Role',
        type: 'string',
        required: true,
        dynamic: 'dropdown_roles.id.name',
        helpText: 'UUID of the role to update.',
      },
      { key: 'name', label: 'Name', type: 'string', required: false, helpText: 'New role name. Leave empty to keep the current one.' },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'New description. Leave empty to keep the current one.' },
      {
        key: 'permissions',
        label: 'Permissions',
        type: 'string',
        required: false,
        list: true,
        helpText: 'Complete replacement set in entity:action form. Leave empty to leave permissions untouched.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const body: Record<string, unknown> = {};

      if (bundle.inputData.name) {
        body.name = bundle.inputData.name;
      }

      if (bundle.inputData.description !== undefined && bundle.inputData.description !== '') {
        body.description = bundle.inputData.description;
      }

      /*
       * Only sent when the user supplied something. An omitted key means "leave
       * the set alone" server-side, so passing an empty array here would clear
       * every permission on the role instead.
       */
      if (Array.isArray(bundle.inputData.permissions) && bundle.inputData.permissions.length > 0) {
        body.permissions = bundle.inputData.permissions;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/roles/${bundle.inputData.role_id}`,
        method: 'PATCH',
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
      name: 'Senior Support Agent',
      permissions: ['support-conversation:view-any', 'support-conversation:update'],
    },
  },
} satisfies Create;
