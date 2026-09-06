import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_support_settings',
  noun: 'Support Settings',
  display: {
    label: 'Get Support Settings',
    description: "Read a project's support inbox settings: whether support is on, where new threads are relayed, the agent name, the auto-reply and email notifications. The relay chat id is never exposed.",
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/support/settings`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      enabled: true,
      relay_mode: 'owner_dm',
      agent_name: 'Team Subscriby',
      auto_reply: null,
      notify_email: true,
      updated_at: '2026-09-06T09:20:00Z',
    },
  },
} satisfies Search;
