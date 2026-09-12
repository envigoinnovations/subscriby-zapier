import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'revert_recovery_operation',
  noun: 'Recovery Operation',
  display: {
    label: 'Revert Recovery Operation',
    description:
      'Undo a completed Disaster Recovery inside its window — a swapped channel put back, or the previous sign-in account restored.',
  },
  operation: {
    inputFields: [
      { key: 'operation_id', label: 'Operation Id', type: 'string', required: true, helpText: 'UUID of the completed recovery to undo.', dynamic: 'dropdown_recovery_operations.id.label' },
      { key: 'resource_id', label: 'Resource Id', type: 'string', required: false, helpText: 'For a channel recovery: the resource to put back. Omit for an account relink.', dynamic: 'dropdown_resources.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const operationId = bundle.inputData.operation_id as string;
      const body: Record<string, unknown> = {};
      if (bundle.inputData.resource_id !== undefined && bundle.inputData.resource_id !== '') body.resource_id = bundle.inputData.resource_id;

      const response = await z.request({
        url: `${apiBaseUrl()}/recovery/operations/${operationId}/revert`,
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
      status: 'reverted',
      status_label: 'Reverted',
      connector: 'telegram',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      project_name: 'Research Premium',
      grant_id: null,
      automatic: false,
      on_demand: true,
      failure_reason: null,
      started_at: '2026-09-12T10:00:00Z',
      completed_at: '2026-09-12T10:00:31Z',
      reverted_at: '2026-09-12T21:50:00Z',
      revertible: false,
      revert_window_ends_at: '2026-09-13T10:00:31Z',
    },
  },
} satisfies Create;
