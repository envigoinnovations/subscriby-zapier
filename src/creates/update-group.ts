import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_group',
  noun: 'Group',
  display: {
    label: 'Update Group',
    description:
      'Rename a group and replace its permissions. Permissions REPLACE the existing set rather than adding to it — leave the field empty to keep the current one. The code cannot be changed, and membership is untouched here.',
  },
  operation: {
    inputFields: [
      {
        key: 'group_id',
        label: 'Group',
        type: 'string',
        required: true,
        dynamic: 'dropdown_groups.id.name',
        helpText: 'UUID of the group to update.',
      },
      { key: 'name', label: 'Name', type: 'string', required: false, helpText: 'New group name. Leave empty to keep the current one.' },
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

      if (Array.isArray(bundle.inputData.permissions) && bundle.inputData.permissions.length > 0) {
        body.permissions = bundle.inputData.permissions;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/groups/${bundle.inputData.group_id}`,
        method: 'PATCH',
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
      name: 'Billing & Finance',
      permissions: ['project-subscription:view-any'],
    },
  },
} satisfies Create;
