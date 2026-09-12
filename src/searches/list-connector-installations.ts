import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_connector_installations',
  noun: 'Connector Installation',
  display: {
    label: 'List Connector Installations',
    description:
      'List every connector installation a project holds — live and standby — with its state, health and the platform\'s own account for it.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/connectors`,
      });

      handleHttpError(response, z);

      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: {
      id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
      connector: 'telegram',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      scope: 'project',
      role: 'live',
      state: 'connected',
      state_reason: null,
      state_detail: null,
      creator_actionable: false,
      operational: true,
      external_id: '7123456789',
      display_name: 'Research Bot',
      handle: 'research_bot',
      avatar_url: null,
      health_checked_at: '2026-09-12T06:00:00+00:00',
      connected_at: '2026-04-21T09:15:00+00:00',
      verified_at: '2026-09-12T06:00:00+00:00',
      revoked_at: null,
      disconnected_at: null,
      uninstalled_at: null,
      created_at: '2026-04-21T09:15:00+00:00',
    },
  },
} satisfies Search;
