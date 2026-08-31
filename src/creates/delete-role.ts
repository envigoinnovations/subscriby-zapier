import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'delete_role',
  noun: 'Role',
  display: {
    label: 'Delete Role',
    description:
      'Delete a team role and detach its permissions. Anyone holding the role loses whatever it granted. Restricted to whoever created the role, unless you own the team.',
  },
  operation: {
    inputFields: [
      {
        key: 'role_id',
        label: 'Role',
        type: 'string',
        required: true,
        dynamic: 'dropdown_roles.id.name',
        helpText: 'UUID of the role to delete. This cannot be undone.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const roleId = bundle.inputData.role_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/roles/${roleId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { id: roleId, deleted: true };
    },
    sample: {
      id: '01HXROLESAMPLE0000000000000',
      deleted: true,
    },
  },
} satisfies Create;
