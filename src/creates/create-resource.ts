import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_resource',
  noun: 'Resource',
  display: {
    label: 'Create Resource',
    description:
      'Create a manual perk (custom text content, an external URL, a token the creator hands over by hand). A place a connector gates is linked through the connector with Request Resource Link; only manual perks are created here, and only once a connector on the project is connected.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'title', label: 'Title', type: 'string', required: true, helpText: '5-255 characters.' },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'Max 1000 chars; HTML filtered server-side.' },
      { key: 'active', label: 'Active', type: 'boolean', required: false, helpText: 'Defaults to true.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {
        title: bundle.inputData.title,
      };

      const passthrough: Array<keyof typeof bundle.inputData> = ['description', 'active'];

      for (const key of passthrough) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key as string] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources`,
        method: 'POST',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      kind: 'manual',
      connector: null,
      space: null,
      title: 'Welcome Kit',
      description: null,
      active: true,
      created_at: '2026-05-18T10:05:00Z',
      updated_at: '2026-05-18T10:05:00Z',
    },
  },
} satisfies Create;