import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

type ConnectorRow = {
  key: string;
  name?: string;
  status_label?: string;
};

export default {
  key: 'dropdown_connectors',
  noun: 'Connector',
  display: {
    label: 'New Connector (Dropdown)',
    description: 'Powers the Connector dropdown in search fields, fed by the live Connectors Marketplace.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    perform: async (z: ZObject, _bundle: Bundle) => {
      const response = await z.request({ url: `${apiBaseUrl()}/connectors` });
      handleHttpError(response, z);

      const rows = (response.data as { data?: ConnectorRow[] }).data ?? [];

      return rows.map((row) => ({
        ...row,
        id: row.key,
        name: `${row.name ?? row.key} · ${row.status_label ?? ''}`,
      }));
    },
    sample: {
      id: 'telegram',
      key: 'telegram',
      name: 'Telegram · Available Now',
    },
  },
} satisfies Trigger;
