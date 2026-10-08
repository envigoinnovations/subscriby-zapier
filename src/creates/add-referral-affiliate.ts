import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'add_referral_affiliate',
  noun: 'Referral Affiliate',
  display: {
    label: 'Add Referral Affiliate',
    description:
      'Enrol a member of a project as an affiliate of its Referral Program by hand: approved whatever the programme\'s customers-only and approval switches say, and handed their code, their links and the programme\'s terms in their chat and by mail. Refused when the member already stands in the programme. Raises New Referral Affiliate.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      {
        key: 'member_id',
        label: 'Member',
        type: 'string',
        required: true,
        dynamic: 'dropdown_members.id.name',
        helpText: 'The member to enrol. Find them with Find Members if the dropdown is long.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/referral-affiliates`,
        method: 'POST',
        body: { member_id: bundle.inputData.member_id },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      program_id: '6e2a7a4f-3b8c-4c21-9f6d-2a3b4c5d6e7f',
      member_id: 'a1b2c3d4-e5f6-4718-8a9b-0c1d2e3f4a5b',
      code: 'ADA2026',
      status: 'approved',
      days_balance: 0,
      balances: [],
      joined_at: '2026-10-08T09:05:00+00:00',
      approved_at: '2026-10-08T09:05:00+00:00',
      created_at: '2026-10-08T09:05:00+00:00',
      updated_at: '2026-10-08T09:05:00+00:00',
    },
  },
} satisfies Create;
