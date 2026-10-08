import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'deactivate_referral_program',
  noun: 'Referral Program',
  label: 'Deactivate Referral Program',
  description:
    'Switch a project\'s Referral Program off: links and codes stop attributing and payments stop earning at once, while what affiliates already earned stays and can still be paid out. Every affiliate is told their link no longer counts new friends. Raises Referral Program Updated. A programme already off is left as it is.',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
  ],
  path: (input) => `/projects/${input.project_id}/referral-program/deactivate`,
  sample: {
    id: '6e2a7a4f-3b8c-4c21-9f6d-2a3b4c5d6e7f',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    active: false,
    reward_kind: 'free_days',
    reward_days: 7,
    friend_reward_kind: 'none',
    hold_days: 14,
    plan_ids: [],
  },
});
