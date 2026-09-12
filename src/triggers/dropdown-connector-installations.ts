import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

type InstallationRow = {
  id: string;
  connector: string;
  role?: string;
  state?: string;
  display_name?: string | null;
};

export default {
  key: 'dropdown_connector_installations',
  noun: 'Connector Installation',
  display: {
    label: 'New Connector Installation (Dropdown)',
    description: 'Powers the Installed Connector dropdown in search fields, from the live installations of the chosen project.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string' as const, required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    ],
    perform: async (z: ZObject, bundle: Bundle) => {
      const projectId = bundle.inputData.project_id as string | undefined;
      if (!projectId) {
        return [];
      }
      const response = await z.request({ url: `${apiBaseUrl()}/projects/${projectId}/connectors` });
      handleHttpError(response, z);

      const rows = (response.data as { data?: InstallationRow[] }).data ?? [];

      return rows
        .filter((row) => row.role === 'live')
        .map((row) => ({
          ...row,
          id: row.id,
          display_name: `${row.connector} · ${row.display_name ?? ''} · ${row.state ?? ''}`,
        }));
    },
    sample: {
      id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
      connector: 'telegram',
      display_name: 'telegram · Research Bot · connected',
    },
  },
} satisfies Trigger;
