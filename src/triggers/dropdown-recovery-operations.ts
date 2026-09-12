import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

type OperationRow = {
  id: string;
  kind?: string;
  kind_label?: string;
  project_name?: string | null;
  started_at?: string | null;
};

export default {
  key: 'dropdown_recovery_operations',
  noun: 'Recovery Operation',
  display: {
    label: 'New Recovery Operation (Dropdown)',
    description: 'Powers the Recovery Operation dropdown in search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    perform: async (z: ZObject, _bundle: Bundle) => {
      const response = await z.request({
        url: `${apiBaseUrl()}/recovery/operations`,
        params: { per_page: 100 },
      });
      handleHttpError(response, z);

      const rows = (response.data as { data?: OperationRow[] }).data ?? [];

      return rows.map((row) => ({
        ...row,
        id: row.id,
        label: `${row.kind_label ?? row.kind ?? ''} · ${row.project_name ?? 'Account'} · ${row.started_at ?? ''}`,
      }));
    },
    sample: {
      id: '9a4d2e71-5b38-4c6f-8e12-3d7c9b0a5f21',
      label: 'Channels & Groups · Research Premium · 2026-09-12T03:19:10+00:00',
    },
  },
} satisfies Trigger;
