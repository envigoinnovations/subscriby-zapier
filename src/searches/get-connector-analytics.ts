import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_connector_analytics',
  noun: 'Connector Analytics',
  display: {
    label: 'Get Connector Analytics',
    description:
      'Retrieve members, access and revenue per connector for the team or a specific project: live installations, members with a linked account, live and pending grants, grants issued and revoked in the window, gross revenue in USD and its share. A purchase spanning two connectors counts toward both.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: false, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'period', label: 'Period', type: 'string', required: false },
      { key: 'from', label: 'From', type: 'datetime', required: false },
      { key: 'to', label: 'To', type: 'datetime', required: false },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.project_id) params.project_id = bundle.inputData.project_id;
      if (bundle.inputData.period) params.period = bundle.inputData.period;
      if (bundle.inputData.from) params.from = bundle.inputData.from;
      if (bundle.inputData.to) params.to = bundle.inputData.to;

      const response = await z.request({
        url: `${apiBaseUrl()}/analytics/connectors`,
        params,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      range: { from: '2026-08-13', to: '2026-09-12' },
      total_gross_usd: 1682.0,
      attribution: 'A purchase that grants access on two connectors counts toward both.',
      connectors: [
        {
          key: 'telegram',
          name: 'Telegram',
          installations: 2,
          members: 241,
          members_linked_in_window: 18,
          live_grants: 236,
          pending_grants: 3,
          granted_in_window: 21,
          revoked_in_window: 4,
          gross_usd: 1682.0,
          transactions: 58,
          share_percent: 100,
        },
      ],
    },
  },
} satisfies Search;
