import { ZObject, Bundle } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_resource',
  noun: 'Resource',
  display: {
    label: 'Create Resource',
    description:
      'Create a Manual-type project resource (custom text content, external URL, etc.). Telegram channel / group / supergroup linking stays bot-only through the RequestChat flow — only manual resources can be created via REST.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true },
      { key: 'title', label: 'Title', type: 'string', required: true, helpText: '5-255 characters.' },
      { key: 'description', label: 'Description', type: 'text', required: false, helpText: 'Max 1000 chars; HTML filtered server-side.' },
      { key: 'active', label: 'Active', type: 'boolean', required: false, helpText: 'Defaults to true.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {
        type: 'manual',
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
      id: 'res_01HXRESOURCESAMPLE00000000',
      title: 'Welcome Kit',
      type: 'manual',
      active: true,
    },
  },
};
