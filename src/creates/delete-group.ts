import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'delete_group',
  noun: 'Group',
  display: {
    label: 'Delete Group',
    description:
      'Delete a permission group. Everyone in it loses whatever the group granted, though they stay in the team.',
  },
  operation: {
    inputFields: [
      {
        key: 'group_id',
        label: 'Group',
        type: 'string',
        required: true,
        dynamic: 'dropdown_groups.id.name',
        helpText: 'UUID of the group to delete. This cannot be undone.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const groupId = bundle.inputData.group_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/groups/${groupId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { id: groupId, deleted: true };
    },
    sample: {
      id: '01HXGROUPSAMPLE000000000000',
      deleted: true,
    },
  },
} satisfies Create;
