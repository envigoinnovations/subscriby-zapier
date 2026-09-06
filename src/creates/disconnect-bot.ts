import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'disconnect_bot',
  noun: 'Bot',
  label: 'Disconnect Bot',
  description:
    "Detach a project's Telegram bot: its webhook and command menu are withdrawn and the project keeps everything else. Members keep the access they hold, but the bot goes silent until the creator connects one again from the dashboard, the only place a bot can be connected. A project with no bot succeeds too.",
  method: 'DELETE',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name' },
  ],
  path: (input) => `/projects/${input.project_id}/bot`,
  emptyResult: (input) => ({ project_id: input.project_id, connected: false }),
  sample: { project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13', connected: false },
});
