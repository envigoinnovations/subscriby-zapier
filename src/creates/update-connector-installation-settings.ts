import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_connector_installation_settings',
  noun: 'Connector Installation',
  display: {
    label: 'Update Connector Installation Settings',
    description:
      "Change a project's connector installation settings. Keys are the field names the connector declares (read them with Get Connector); every declared rule runs, an undeclared key is refused, and fields left out keep their value. Values are never returned.",
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'connector', label: 'Installed Connector', type: 'string', required: true, dynamic: 'dropdown_connector_installations.connector.display_name' },
      { key: 'settings', label: 'Settings', dict: true, required: true, helpText: 'One row per declared settings field: the field name as the key, the new value as the value.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const connector = bundle.inputData.connector as string;
      const settings = (bundle.inputData.settings ?? {}) as Record<string, unknown>;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/connectors/${encodeURIComponent(connector)}/installation/settings`,
        method: 'PATCH',
        headers: { 'Idempotency-Key': randomUUID() },
        body: { settings },
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
    },
    sample: {
      id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
      connector: 'discord',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      scope: 'project',
      role: 'live',
      state: 'connected',
      operational: true,
      display_name: 'Research Premium',
      handle: 'research-premium',
      created_at: '2026-09-12T10:05:00+00:00',
    },
  },
} satisfies Create;
