import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_recovery_roll_call',
  noun: 'Recovery Roll Call',
  display: {
    label: 'Get Recovery Roll Call',
    description:
      'Retrieve where the re-admission after one Disaster Recovery operation stands: members re-admitted, joined, still outside, and whether a reminder may go out now.',
  },
  operation: {
    inputFields: [
      {
        key: 'operation_id',
        label: 'Recovery Operation',
        type: 'string',
        required: true,
        dynamic: 'dropdown_recovery_operations.id.label',
        helpText: 'The recovery whose roll call to read. A recovery that re-admits nobody answers every counter at zero.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const operationId = bundle.inputData.operation_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/recovery/operations/${operationId}/roll-call`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [{ operation_id: operationId, ...data }] : [];
    },
    sample: {
      operation_id: '9a4d2e71-5b38-4c6f-8e12-3d7c9b0a5f21',
      total: 340,
      regranted: 340,
      failed: 0,
      unreachable: 12,
      emailed: 12,
      joined: 338,
      pending: 2,
      nudged: 1,
      settled: true,
      cooling_down: false,
      can_nudge: true,
      last_nudged_at: '2026-09-12T09:00:00+00:00',
      nudge_available_at: '2026-09-12T10:00:00+00:00',
    },
  },
} satisfies Search;
