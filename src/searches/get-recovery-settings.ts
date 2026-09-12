import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_recovery_settings',
  noun: 'Recovery Settings',
  display: {
    label: 'Get Recovery Settings',
    description:
      'Read one project\'s Disaster Recovery settings — automatic failover and its fee consent, how members are told after a swap, and whether a standby installation is kept.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project Id', type: 'string', required: true, helpText: 'UUID of the project.', dynamic: 'dropdown_projects.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/recovery/settings`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      auto_failover_enabled: true,
      auto_failover_email_consented_at: '2026-09-01T14:20:00Z',
      email_delivery: 'platform',
      email_delivery_label: 'Subscriby emails them',
      standby_installation_registered: true,
    },
  },
} satisfies Search;
