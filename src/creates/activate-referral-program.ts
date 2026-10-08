import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'activate_referral_program',
  noun: 'Referral Program',
  label: 'Activate Referral Program',
  description:
    'Switch a project\'s Referral Program on: affiliates\' links and codes attribute again, settled payments earn again, and every affiliate is told the terms as they now stand. Raises Referral Program Updated with "active" as the one change. A programme already on is left as it is.',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
  ],
  path: (input) => `/projects/${input.project_id}/referral-program/activate`,
  sample: {
    id: '6e2a7a4f-3b8c-4c21-9f6d-2a3b4c5d6e7f',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    active: true,
    reward_kind: 'free_days',
    reward_days: 7,
    friend_reward_kind: 'none',
    hold_days: 14,
    plan_ids: [],
  },
});
