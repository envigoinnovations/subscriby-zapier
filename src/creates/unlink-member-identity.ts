import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'unlink_member_identity',
  noun: 'Member Identity',
  display: {
    label: 'Unlink Member Identity',
    description:
      'Disconnect one of a member\'s platform accounts. Refused when it is their last way to sign in. Emits the member.identity_unlinked webhook.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'member_id', label: 'Member ID', type: 'string', required: true, dynamic: 'dropdown_members.id.name' },
      {
        key: 'identity_id',
        label: 'Identity Link ID',
        type: 'string',
        required: true,
        helpText: 'The `id` of the connected account from List Member Identities (the link, not the platform\'s own account id).',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const memberId = bundle.inputData.member_id as string;
      const identityId = bundle.inputData.identity_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/members/${memberId}/identities/${identityId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { member_id: memberId, identity_id: identityId, removed: true };
    },
    sample: {
      member_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      identity_id: '6a1f0c3e-2d4b-4e8a-9c7d-1b5e3f9a2c4d',
      removed: true,
    },
  },
} satisfies Create;
