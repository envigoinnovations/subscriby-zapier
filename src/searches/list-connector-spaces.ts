import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

type SpaceRow = {
  external_id: string;
  kind: string;
  title: string;
  parent_external_id?: string | null;
  meta?: Record<string, unknown> | null;
};

export default {
  key: 'list_connector_spaces',
  noun: 'Connector Space',
  display: {
    label: 'List Connector Spaces',
    description:
      "List the places of one kind a project's installation of a connector could gate, as the platform lists them right now (a server's roles or channels). Only a connector that lists its places answers; pass an external_id from here to Create Resource From Space to sell the place.",
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      {
        key: 'kind',
        label: 'Kind',
        type: 'string',
        required: true,
        dynamic: 'dropdown_resource_kinds.id.name',
        helpText: "The kind of place to list, spelled connector:kind (discord:role) as List Connectors lists each connector's resource kinds; the dropdown offers the kinds the project's connected connectors gate.",
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const kind = String(bundle.inputData.kind ?? '');
      const connector = kind.includes(':') ? kind.slice(0, kind.indexOf(':')) : kind;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/connectors/${encodeURIComponent(connector)}/installation/spaces`,
        params: { kind },
      });

      handleHttpError(response, z);

      return ((response.data as { data?: SpaceRow[] }).data ?? []).map((row) => ({ ...row, id: row.external_id }));
    },
    sample: {
      id: '1183455190821797899',
      external_id: '1183455190821797899',
      kind: 'role',
      title: 'Gold members',
      parent_external_id: null,
      meta: { colour: '#f1c40f', position: 4 },
    },
  },
} satisfies Search;
