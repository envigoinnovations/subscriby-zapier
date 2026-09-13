import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'request_resource_link',
  noun: 'Resource Link Request',
  display: {
    label: 'Request Resource Link',
    description:
      'Ask the creator, through the connector, to pick the place a new resource will be (a channel, group or supergroup the connector gates); the resource appears the moment they choose. Nothing is created by the call itself. Manual perks are created with Create Resource instead.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, helpText: 'The project the linked place will belong to.', dynamic: 'dropdown_projects.id.name' },
      {
        key: 'kind',
        label: 'Kind',
        type: 'string',
        required: true,
        choices: { channel: 'Channel', group: 'Group', supergroup: 'Supergroup' },
        helpText: 'The kind of place the connector should ask the creator to pick.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/link-requests`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
        body: { kind: bundle.inputData.kind },
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
    },
    sample: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      kind: 'channel',
      status: 'request_sent',
    },
  },
} satisfies Create;
