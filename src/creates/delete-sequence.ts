import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'delete_sequence',
  noun: 'Sequence',
  label: 'Delete Sequence',
  description:
    'Put a recovery sequence out of use: every member part-way through leaves it at once, the row and its history stay for the figures, and the id stops answering. Never undone; to stop a sequence without losing it, set it inactive with Update Sequence instead.',
  method: 'DELETE',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'sequence_id', label: 'Sequence ID', type: 'string', required: true, helpText: 'UUID of the sequence. Find it with Find Sequences.' },
  ],
  path: (input) => `/projects/${input.project_id}/sequences/${input.sequence_id}`,
  emptyResult: (input) => ({ project_id: input.project_id, sequence_id: input.sequence_id, deleted: true }),
  sample: {
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    sequence_id: '9d2f4b6a-1c3e-4f58-8a7b-6e5d4c3b2a19',
    deleted: true,
  },
});
