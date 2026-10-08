import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'approve_referral_affiliate',
  noun: 'Referral Affiliate',
  label: 'Approve Referral Affiliate',
  description:
    'Approve a pending or suspended affiliate: their code counts from now on, and they receive their link, code and the programme\'s terms in their chat and by mail. Raises Referral Affiliate Approved. An affiliate already approved is left as they are.',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'affiliate_id', label: 'Affiliate ID', type: 'string', required: true, helpText: 'UUID of the affiliate; find it with Find Referral Affiliates.' },
  ],
  path: (input) => `/projects/${input.project_id}/referral-affiliates/${input.affiliate_id}/approve`,
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
    approved_at: '2026-10-08T10:00:00+00:00',
    created_at: '2026-10-08T09:05:00+00:00',
    updated_at: '2026-10-08T10:00:00+00:00',
  },
});
