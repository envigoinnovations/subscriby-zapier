import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_copilot_credits_statement',
  noun: 'Copilot Credits Statement Line',
  display: {
    label: 'Find Copilot Credits Statement',
    description:
      "List the creator's Copilot Credits statement, newest first: every pack bought and its bonus, every promotion and goodwill grant, every refund and lapse, and each month's usage per kind. Credits are positive and debits negative, in US cents.",
  },
  operation: {
    inputFields: [
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Lines per page, 1–100. Leave blank for the server default of 25.',
      },
      { key: 'page', label: 'Page', type: 'integer', required: false, helpText: '1-indexed.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/me/copilot-credits/statement`,
        params,
      });

      handleHttpError(response, z);

      const rows = (response.data as { data?: Record<string, unknown>[] }).data ?? [];

      return rows.map((row, index) => ({ id: `${row.kind}-${row.at}-${index}`, ...row }));
    },
    sample: {
      id: 'usage-2026-10-01T00:00:00Z-0',
      kind: 'usage',
      kind_label: 'Copilot Usage',
      cents: -120,
      at: '2026-10-01T00:00:00Z',
      label: 'Copilot Turns, October 2026',
      expires_at: null,
      units: 12,
      usage_kind: 'operator_turn',
      usage_kind_label: 'Copilot Turns',
    },
  },
} satisfies Search;
