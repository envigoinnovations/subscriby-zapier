import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'delete_knowledge_entry',
  noun: 'Knowledge Entry',
  label: 'Delete Knowledge Entry',
  description:
    'Take back something the Copilot was taught. The entry, its passages and its file go together and the Copilot stops answering from it at once; nothing is recoverable. To keep it for the team alone, use Update Knowledge Entry with the audience set to Team Only instead.',
  method: 'DELETE',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'knowledge_entry_id', label: 'Knowledge Entry ID', type: 'string', required: true, helpText: 'UUID of the entry to remove.' },
  ],
  path: (input) => `/projects/${input.project_id}/knowledge/${input.knowledge_entry_id}`,
  emptyResult: (input) => ({ id: input.knowledge_entry_id, deleted: true }),
  sample: { id: '3b7e4d2a-9c1f-4a6b-8d5e-2f7c9a1b3e4d', deleted: true },
});
