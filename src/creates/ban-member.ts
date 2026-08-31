import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'ban_member',
  noun: 'Member',
  display: {
    label: 'Ban Member',
    description: 'Ban a project subscriber. Flips status to Banned and emits the member.banned webhook.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'member_id', label: 'Member ID', type: 'string', required: true, dynamic: 'dropdown_members.id.name' },
      { key: 'reason', label: 'Reason', type: 'string', required: false },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const memberId = bundle.inputData.member_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/members/${memberId}/ban`,
        method: 'POST',
        body: { reason: bundle.inputData.reason ?? null },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      status: 'banned',
    },
  },
} satisfies Create;