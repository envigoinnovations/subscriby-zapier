import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_resource_from_space',
  noun: 'Resource',
  display: {
    label: 'Create Resource From Space',
    description:
      "Sell a place picked from the list a connector offers (a server's role or channel): the resource is created and bound to the place, the way the connector's own link flow does it. The installation is asked again before the row persists, so a place it does not list is refused; a place the project already sells answers its existing resource. A connector that cannot list its places takes Request Resource Link instead.",
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
        altersDynamicFields: true,
        helpText: "The kind of place, spelled connector:kind (discord:role) as List Connectors lists each connector's resource kinds, on a connector that lists its places.",
      },
      {
        key: 'external_id',
        label: 'Place',
        type: 'string',
        required: true,
        dynamic: 'dropdown_connector_spaces.id.title',
        helpText: "The place, as List Connector Spaces lists it under external_id; the dropdown offers the places of the chosen kind the project's installation can see.",
      },
      { key: 'title', label: 'Title', type: 'string', required: true, helpText: 'The resource title members read, 5 to 255 characters.' },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'What members get, up to 1000 characters of well-formed HTML, shown as a perk beside the title.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const body: Record<string, unknown> = {
        kind: bundle.inputData.kind,
        external_id: bundle.inputData.external_id,
        title: bundle.inputData.title,
      };

      if (bundle.inputData.description) {
        body.description = bundle.inputData.description;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/from-space`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
        body,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
    },
    sample: {
      id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      kind: 'discord:role',
      connector: 'discord',
      space: {
        id: '4d2a7c1e-5b3f-4e8a-9c6d-2f1b3a4c5d6e',
        external_id: '1183455190821797899',
        title: 'Gold members',
      },
      title: 'Gold members role',
      description: '<p>The Gold role and everything it unlocks.</p>',
      active: true,
      created_at: '2026-11-02T10:07:00+00:00',
      updated_at: '2026-11-02T10:07:00+00:00',
    },
  },
} satisfies Create;
