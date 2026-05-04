import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'kick_member',
  noun: 'Member',
  display: {
    label: 'Kick Member',
    description: 'Kick a project subscriber without banning them. Rolls status to Churned.',
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
        url: `${apiBaseUrl()}/projects/${projectId}/members/${memberId}/kick`,
        method: 'POST',
        body: { reason: bundle.inputData.reason ?? null },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: { id: 'usr_01HXUSERSAMPLE0000000000000', status: 'churned' },
  },
} satisfies Create;