import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'delete_canned_reply',
  noun: 'Canned Reply',
  label: 'Delete Canned Reply',
  description: "Remove a saved reply from a project's support picker. Replies already sent with the snippet are untouched.",
  method: 'DELETE',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'canned_reply_id', label: 'Canned Reply ID', type: 'string', required: true, helpText: 'UUID of the saved reply to remove.' },
  ],
  path: (input) => `/projects/${input.project_id}/support/canned-replies/${input.canned_reply_id}`,
  emptyResult: (input) => ({ id: input.canned_reply_id, deleted: true }),
  sample: { id: 'c0a8f3d2-6b41-4e7a-9c25-8d1f0e3b7a64', deleted: true },
});
