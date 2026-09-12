import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'disconnect_connector',
  noun: 'Connector Installation',
  label: 'Disconnect Connector',
  description:
    "Disconnect a project's installation of one connector: the connector withdraws it, the credentials are wiped and the installation turns disconnected. Members keep their access; grants, resources, plans and identities are untouched; the creator can connect it again from the dashboard. The neutral twin of Disconnect Bot.",
  method: 'DELETE',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'connector', label: 'Installed Connector', type: 'string', required: true, dynamic: 'dropdown_connector_installations.connector.display_name' },
  ],
  path: (input) => `/projects/${input.project_id}/connectors/${encodeURIComponent(String(input.connector))}/installation`,
  emptyResult: (input) => ({ project_id: input.project_id, connector: input.connector, disconnected: true }),
  sample: { project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13', connector: 'telegram', disconnected: true },
});
