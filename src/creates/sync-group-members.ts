import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'sync_group_members',
  noun: 'Group',
  display: {
    label: 'Sync Group Members',
    description:
      'Replace a group\'s membership with the supplied user IDs. This is a SYNC, not an add — anyone left out is removed, and an empty list empties the group. Every ID must already belong to the group\'s team, or the whole call is refused rather than partly applied.',
  },
  operation: {
    inputFields: [
      {
        key: 'group_id',
        label: 'Group',
        type: 'string',
        required: true,
        dynamic: 'dropdown_groups.id.name',
        helpText: 'UUID of the group whose membership is being replaced.',
      },
      {
        key: 'user_ids',
        label: 'Members',
        type: 'string',
        required: false,
        list: true,
        helpText:
          'Complete list of user UUIDs the group should contain. Anyone not listed is removed. Leave empty to clear the group entirely.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      /*
       * Sent even when empty, unlike the permission fields on the update
       * actions. Clearing a group is a legitimate request here and the endpoint
       * distinguishes "no members" from "field omitted".
       */
      const userIds = Array.isArray(bundle.inputData.user_ids) ? bundle.inputData.user_ids : [];

      const response = await z.request({
        url: `${apiBaseUrl()}/groups/${bundle.inputData.group_id}/members`,
        method: 'PUT',
        body: { user_ids: userIds },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '01HXGROUPSAMPLE000000000000',
      team_id: '01HXTEAMSAMPLE0000000000000',
      member_ids: ['01HXUSERSAMPLE0000000000000'],
    },
  },
} satisfies Create;
