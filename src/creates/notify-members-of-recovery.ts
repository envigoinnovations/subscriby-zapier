import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'notify_members_of_recovery',
  noun: 'Recovery Operation',
  display: {
    label: 'Notify Members Of Recovery',
    description:
      'Email every member the project can reach that its bot changed after a bot replacement, at the per-email fee. Sent once per recovery.',
  },
  operation: {
    inputFields: [
      { key: 'operation_id', label: 'Operation Id', type: 'string', required: true, helpText: 'UUID of the bot recovery whose project members to email.', dynamic: 'dropdown_recovery_operations.id.label' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const operationId = bundle.inputData.operation_id as string;
      const body: Record<string, unknown> = {};

      const response = await z.request({
        url: `${apiBaseUrl()}/recovery/operations/${operationId}/notify-members`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
        body,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
    },
    sample: {
      operation_id: 'c2e8f1a9-6d47-4b3e-9f05-1a8d7c2e4b60',
      notified: 340,
    },
  },
} satisfies Create;
