import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'install_connector',
  noun: 'Connector Installation',
  label: 'Install Connector',
  description:
    "Install a connector on a project: opens a pending installation with no credentials yet, which the creator connects from the dashboard. Installing one that is already installed changes nothing. Refused for a connector that is not installable today, or for a second connector when the project owner's plan lacks the multi-connector capability.",
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name' },
    { key: 'connector', label: 'Connector', type: 'string', required: true, dynamic: 'dropdown_connectors.id.name', helpText: 'Only a connector whose status is Available Now or Experimental can be installed.' },
  ],
  path: (input) => `/projects/${input.project_id}/connectors/${encodeURIComponent(String(input.connector))}`,
  sample: {
    id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
    connector: 'discord',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    scope: 'project',
    role: 'live',
    state: 'pending',
    state_reason: null,
    state_detail: null,
    creator_actionable: false,
    operational: false,
    external_id: null,
    display_name: null,
    handle: null,
    avatar_url: null,
    health_checked_at: null,
    connected_at: null,
    verified_at: null,
    revoked_at: null,
    disconnected_at: null,
    uninstalled_at: null,
    created_at: '2026-09-12T10:05:00+00:00',
  },
});
