import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

type SpaceRow = {
  external_id: string;
  kind: string;
  title: string;
};

export default {
  key: 'dropdown_connector_spaces',
  noun: 'Connector Space',
  display: {
    label: 'New Connector Space (Dropdown)',
    description: "Powers the Place dropdown of Create Resource From Space: the places of the chosen kind the project's installation can see, as the platform lists them.",
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string' as const, required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'kind', label: 'Kind', type: 'string' as const, required: true, dynamic: 'dropdown_resource_kinds.id.name', altersDynamicFields: true },
    ],
    perform: async (z: ZObject, bundle: Bundle) => {
      const projectId = bundle.inputData.project_id as string | undefined;
      const kind = String(bundle.inputData.kind ?? '');

      if (!projectId || !kind.includes(':')) {
        return [];
      }

      const connector = kind.slice(0, kind.indexOf(':'));
      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/connectors/${encodeURIComponent(connector)}/installation/spaces`,
        params: { kind },
      });
      handleHttpError(response, z);

      return ((response.data as { data?: SpaceRow[] }).data ?? []).map((row) => ({
        id: row.external_id,
        external_id: row.external_id,
        kind: row.kind,
        title: row.title,
      }));
    },
    sample: {
      id: '1183455190821797899',
      external_id: '1183455190821797899',
      kind: 'role',
      title: 'Gold members',
    },
  },
} satisfies Trigger;
