import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_resource',
  noun: 'Resource',
  display: {
    label: 'Update Resource',
    description:
      "Change a resource's title, description or on/off switch. Partial: only the fields you fill in change, so a title-only update leaves the description as stored. The type and Telegram link are not editable here.",
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      { key: 'resource_id', label: 'Resource ID', type: 'string', required: true, dynamic: 'dropdown_resources.id.name' },
      { key: 'title', label: 'Title', type: 'string', required: false, helpText: '5–255 characters.' },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'Up to 1,000 characters; HTML is filtered to a safe subset.' },
      { key: 'active', label: 'Active', type: 'boolean', required: false, helpText: 'Whether the resource is delivered to members. A plan grants only its active resources.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const resourceId = bundle.inputData.resource_id as string;

      const body: Record<string, unknown> = {};

      for (const key of ['title', 'description', 'active']) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/${resourceId}`,
        method: 'PATCH',
        headers: { 'Idempotency-Key': randomUUID(), 'Content-Type': 'application/json' },
        json: body,
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '8c2f4a61-3d7e-4b90-a5c8-1e6f9d0b2c73',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      type: 'supergroup',
      title: 'Members lounge (VIP)',
      description: null,
      chat_id: '-1001234567890',
      active: true,
      created_at: '2026-05-18T10:05:00Z',
      updated_at: '2026-09-06T09:20:00Z',
    },
  },
} satisfies Create;
