import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

type ActionRow = {
  key: string;
  label: string;
  description: string;
};

export default {
  key: 'dropdown_installation_actions',
  noun: 'Installation Action',
  display: {
    label: 'New Installation Action (Dropdown)',
    description: "Powers the Action dropdown of Run Connector Installation Action: what the chosen project's installation of a connector can do right now.",
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string' as const, required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'connector', label: 'Installed Connector', type: 'string' as const, required: true, dynamic: 'dropdown_connector_installations.connector.display_name', altersDynamicFields: true },
    ],
    perform: async (z: ZObject, bundle: Bundle) => {
      const projectId = bundle.inputData.project_id as string | undefined;
      const connector = String(bundle.inputData.connector ?? '');

      if (!projectId || !connector) {
        return [];
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/connectors/${encodeURIComponent(connector)}/installation/actions`,
      });
      handleHttpError(response, z);

      return ((response.data as { data?: ActionRow[] }).data ?? []).map((row) => ({
        id: row.key,
        key: row.key,
        label: row.label,
        description: row.description,
      }));
    },
    sample: {
      id: 'setup_members_area',
      key: 'setup_members_area',
      label: 'Set up a members area',
      description: 'Creates a Members category with a text channel, an announcements channel and a voice channel, and the role behind them.',
    },
  },
} satisfies Trigger;
