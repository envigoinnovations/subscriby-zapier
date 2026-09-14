import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'restore_connector_access',
  noun: 'Connector Installation',
  label: 'Restore Connector Access',
  description:
    "Bring a project's detached places on a reinstalled connector back. Every resource the uninstall detached is asked about; the ones the connector still controls are reactivated, and every live purchase of a plan granting them is handed fresh access (Member Resource Added fires per grant issued). Places the connector no longer controls stay detached for Run Connector Doctor to explain; plans taken off sale stay off sale. Refused until the installation is connected again.",
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'connector', label: 'Installed Connector', type: 'string', required: true, dynamic: 'dropdown_connector_installations.connector.display_name' },
  ],
  path: (input) => `/projects/${input.project_id}/connectors/${encodeURIComponent(String(input.connector))}/installation/restore-access`,
  sample: {
    installation: {
      id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
      connector: 'telegram',
      state: 'connected',
    },
    connector: 'telegram',
    resources: [
      { resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6', title: 'Premium Channel', restored: true },
      { resource_id: '0d4a7e19-5c2b-4f83-9a61-2e8b7c3d5f10', title: 'Archive Group', restored: false },
    ],
    resources_reactivated: 1,
    resources_still_detached: 1,
    subscriptions_reissued: 14,
  },
});
