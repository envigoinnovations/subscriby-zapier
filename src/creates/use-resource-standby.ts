import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'use_resource_standby',
  noun: 'Resource Standby',
  display: {
    label: 'Use Resource Standby',
    description:
      'Swap a resource onto its standby right now: old links revoked, every active member re-admitted, the standby consumed. Returns the recovery operation it ran under.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, helpText: 'The project the route is keyed under.', dynamic: 'dropdown_projects.id.name' },
      { key: 'resource_id', label: 'Resource Id', type: 'string', required: true, helpText: 'UUID of the resource to swap onto its standby.', dynamic: 'dropdown_resources.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const resourceId = bundle.inputData.resource_id as string;
      const body: Record<string, unknown> = {};

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/resources/${resourceId}/standby/use`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
        body,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
    },
    sample: {
      id: '9a4d2e71-5b38-4c6f-8e12-3d7c9b0a5f21',
      kind: 'resources',
      kind_label: 'Channels & Groups',
      status: 'completed',
      status_label: 'Completed',
      connector: 'telegram',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      project_name: 'Research Premium',
      grant_id: null,
      automatic: false,
      on_demand: true,
      failure_reason: null,
      started_at: '2026-09-12T10:00:00Z',
      completed_at: '2026-09-12T10:00:31Z',
      reverted_at: null,
      revertible: true,
      revert_window_ends_at: '2026-09-13T10:00:31Z',
    },
  },
} satisfies Create;
