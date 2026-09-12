import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'run_connector_doctor',
  noun: 'Connector Installation',
  label: 'Run Connector Doctor',
  description:
    "Verify a project's installation of a connector and ask the connector about every resource it gates. Answers one report with a finding per check: the installation first, then each resource, each with its severity (ok, warning, critical), the connector's own state word and sentence, whether the creator can fix it and where. The report is kept on the installation; Connector Doctor Completed fires only when the findings changed.",
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'connector', label: 'Installed Connector', type: 'string', required: true, dynamic: 'dropdown_connector_installations.connector.display_name' },
  ],
  path: (input) => `/projects/${input.project_id}/connectors/${encodeURIComponent(String(input.connector))}/installation/doctor`,
  sample: {
    installation_id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
    connector: 'telegram',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    ran_at: '2026-09-12T10:07:00+00:00',
    healthy: true,
    critical: 0,
    warnings: 0,
    findings: [
      {
        key: 'installation',
        kind: 'installation',
        severity: 'ok',
        severity_label: 'OK',
        subject: 'Research Bot',
        state: 'connected',
        message: 'The connector still answers for this installation.',
        creator_actionable: false,
        fix_url: null,
        resource_id: null,
      },
    ],
  },
});
