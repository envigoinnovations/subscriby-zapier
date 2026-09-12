import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'nudge_pending_readmissions',
  noun: 'Recovery Operation',
  display: {
    label: 'Nudge Pending Readmissions',
    description:
      'Send one reminder, with a fresh link, to every member a channel recovery re-admitted who has not joined the new chat yet.',
  },
  operation: {
    inputFields: [
      { key: 'operation_id', label: 'Operation Id', type: 'string', required: true, helpText: 'UUID of the completed channel recovery whose stragglers to remind.', dynamic: 'dropdown_recovery_operations.id.label' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const operationId = bundle.inputData.operation_id as string;
      const body: Record<string, unknown> = {};

      const response = await z.request({
        url: `${apiBaseUrl()}/recovery/operations/${operationId}/nudge`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
        body,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
    },
    sample: {
      operation_id: '9a4d2e71-5b38-4c6f-8e12-3d7c9b0a5f21',
      nudged: 2,
    },
  },
} satisfies Create;
