import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'delete_referral_program',
  noun: 'Referral Program',
  label: 'Delete Referral Program',
  description:
    'Remove a project\'s Referral Program. Refused while any affiliate is still owed a commission: record their payouts first, or use Deactivate Referral Program, which stops the programme and keeps everything. Deleting raises no event.',
  method: 'DELETE',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
  ],
  path: (input) => `/projects/${input.project_id}/referral-program`,
  emptyResult: (input) => ({ project_id: input.project_id, deleted: true }),
  sample: {
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    deleted: true,
  },
});
