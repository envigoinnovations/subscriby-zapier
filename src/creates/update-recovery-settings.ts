import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_recovery_settings',
  noun: 'Recovery Settings',
  display: {
    label: 'Update Recovery Settings',
    description:
      'Change one project\'s Disaster Recovery settings: switch automatic failover on or off (with the fee consent), and choose how members are told after a swap. Fields left out keep their value.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project Id', type: 'string', required: true, helpText: 'UUID of the project.', dynamic: 'dropdown_projects.id.name' },
      { key: 'auto_failover', label: 'Auto Failover', type: 'boolean', required: false, helpText: 'Switch automatic failover on (true) or off (false). Omit to leave it.' },
      { key: 'accepts_email_fee', label: 'Accepts Email Fee', type: 'boolean', required: false, helpText: 'Required true when switching failover on.' },
      { key: 'email_delivery', label: 'Email Delivery', type: 'string', required: false, helpText: '`self` or `platform`. Omit to leave it.', choices: { self: 'Self', platform: 'Platform' } },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const body: Record<string, unknown> = {};
      if (bundle.inputData.auto_failover !== undefined && bundle.inputData.auto_failover !== '') body.auto_failover = bundle.inputData.auto_failover;
      if (bundle.inputData.accepts_email_fee !== undefined && bundle.inputData.accepts_email_fee !== '') body.accepts_email_fee = bundle.inputData.accepts_email_fee;
      if (bundle.inputData.email_delivery !== undefined && bundle.inputData.email_delivery !== '') body.email_delivery = bundle.inputData.email_delivery;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/recovery/settings`,
        method: 'PATCH',
        headers: { 'Idempotency-Key': randomUUID() },
        body,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
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
} satisfies Create;
