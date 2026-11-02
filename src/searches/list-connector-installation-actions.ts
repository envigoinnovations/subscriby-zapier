import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

type ActionRow = {
  key: string;
  label: string;
  description: string;
  fields: Array<Record<string, unknown>>;
  confirm?: string | null;
  needs_confirmation: boolean;
};

export default {
  key: 'list_connector_installation_actions',
  noun: 'Installation Action',
  display: {
    label: 'List Connector Installation Actions',
    description:
      "List what a project's installation of a connector can do for the creator right now, beyond gating: each action with its key, label, description, the fields it asks for and whether it asks for confirmation. Empty for a connector that offers none or an installation that cannot act. Run one with Run Connector Installation Action.",
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'connector', label: 'Installed Connector', type: 'string', required: true, dynamic: 'dropdown_connector_installations.connector.display_name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const connector = String(bundle.inputData.connector ?? '');

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/connectors/${encodeURIComponent(connector)}/installation/actions`,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: ActionRow[] }).data ?? []).map((row) => ({ ...row, id: row.key }));
    },
    sample: {
      id: 'setup_members_area',
      key: 'setup_members_area',
      label: 'Set up a members area',
      description: 'Creates a Members category with a text channel, an announcements channel and a voice channel, and the role behind them.',
      fields: [
        {
          name: 'category_name',
          type: 'text',
          label: 'Category name',
          help: null,
          required: false,
          rules: ['string', 'max:100'],
          options: [],
          value: 'Members',
          steps: [],
          links: [],
        },
      ],
      confirm: 'Create the members area in this server now?',
      needs_confirmation: true,
    },
  },
} satisfies Search;
