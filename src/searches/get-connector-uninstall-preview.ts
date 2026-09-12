import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_connector_uninstall_preview',
  noun: 'Connector Uninstall Preview',
  display: {
    label: 'Get Connector Uninstall Preview',
    description:
      'Show what uninstalling a connector from a project would touch, changing nothing: its resources, the live grants on them, the plans left with nothing to grant, the subscriptions on those plans, and the opt-in defaults.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'connector', label: 'Installed Connector', type: 'string', required: true, dynamic: 'dropdown_connector_installations.connector.display_name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const connector = bundle.inputData.connector as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/connectors/${encodeURIComponent(connector)}/uninstall-preview`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: { installation?: { id?: string } } & Record<string, unknown> }).data;

      return data ? [{ ...data, id: data.installation?.id ?? `${projectId}:${connector}` }] : [];
    },
    sample: {
      id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
      connector: 'discord',
      resources: [{ id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6', title: 'Members Lounge', type: null, kind: 'discord:role', active: true }],
      live_grants: 41,
      emptied_plans: [{ id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b', name: 'Lounge Monthly', active: true, recurring: true }],
      recurring_subscriptions: 17,
      one_time_subscriptions: 3,
      affected_subscription_ids: ['5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4'],
      upcoming_windows: 0,
      open_support_threads: 2,
      member_identities: 44,
      empties_plans: true,
      options: { unpublish_emptied_plans: true, cancel_recurring_subscriptions: true },
    },
  },
} satisfies Search;
