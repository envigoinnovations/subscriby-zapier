import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'set_resource_standby_mirror',
  noun: 'Resource Standby',
  display: {
    label: 'Set Resource Standby Mirror',
    description:
      'Switch the live mirror into a resource\'s standby on or off, so a failover lands members in a channel that already holds the content.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, helpText: 'The project the route is keyed under.', dynamic: 'dropdown_projects.id.name' },
      { key: 'resource_id', label: 'Resource Id', type: 'string', required: true, helpText: 'UUID of the resource whose standby to mirror into.', dynamic: 'dropdown_resources.id.name' },
      { key: 'mirror', label: 'Mirror', type: 'boolean', required: true, helpText: 'True to copy every post into the standby, false to stop.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const resourceId = bundle.inputData.resource_id as string;
      const body: Record<string, unknown> = {};
      if (bundle.inputData.mirror !== undefined && bundle.inputData.mirror !== '') body.mirror = bundle.inputData.mirror;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/${resourceId}/standby`,
        method: 'PATCH',
        headers: { 'Idempotency-Key': randomUUID() },
        body,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
    },
    sample: {
      resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
      mirror_enabled: true,
      health_status: 'healthy',
      health_status_label: 'Healthy',
      health_reason: null,
      health_checked_at: '2026-09-12T02:00:00Z',
      last_mirrored_at: '2026-09-12T01:45:12Z',
      linked_at: '2026-09-01T14:22:09Z',
    },
  },
} satisfies Create;
