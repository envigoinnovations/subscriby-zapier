import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'verify_connector_installation',
  noun: 'Connector Installation',
  label: 'Verify Connector Installation',
  description:
    "Ask the connector whether a project's installation still answers and record the verdict on it: connected, degraded (with the reason) or revoked. A pending installation is returned as it is. Fires Connector Status Changed only when the state moved.",
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'connector', label: 'Installed Connector', type: 'string', required: true, dynamic: 'dropdown_connector_installations.connector.display_name' },
  ],
  path: (input) => `/projects/${input.project_id}/connectors/${encodeURIComponent(String(input.connector))}/installation/verify`,
  sample: {
    id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
    connector: 'telegram',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    scope: 'project',
    role: 'live',
    state: 'connected',
    state_reason: null,
    state_detail: null,
    creator_actionable: false,
    operational: true,
    external_id: '7123456789',
    display_name: 'Research Bot',
    handle: 'research_bot',
    avatar_url: null,
    health_checked_at: '2026-09-12T10:07:00+00:00',
    connected_at: '2026-04-21T09:15:00+00:00',
    verified_at: '2026-09-12T10:07:00+00:00',
    revoked_at: null,
    disconnected_at: null,
    uninstalled_at: null,
    created_at: '2026-04-21T09:15:00+00:00',
  },
});
