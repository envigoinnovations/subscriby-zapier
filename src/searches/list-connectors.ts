import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_connectors',
  noun: 'Connector',
  display: {
    label: 'List Connectors',
    description:
      'List the Connectors Marketplace — every connector Subscriby knows, lane by lane, with its badges, manifest and the declarative form that connects it.',
  },
  operation: {
    inputFields: [
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: {
          available: 'Available Now',
          beta: 'Experimental',
          paused: 'Paused',
          in_development: 'Under Development',
          coming_soon: 'Coming Soon',
        },
        helpText: 'Narrow to one lane. Leave blank for every lane.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.status) params.status = bundle.inputData.status;

      const response = await z.request({
        url: `${apiBaseUrl()}/connectors`,
        params,
      });

      handleHttpError(response, z);

      const rows = (response.data as { data?: { key: string }[] }).data ?? [];

      return rows.map((row) => ({ ...row, id: row.key }));
    },
    sample: {
      id: 'telegram',
      key: 'telegram',
      name: 'Telegram',
      vendor: 'Subscriby',
      version: '1.0.0',
      status: 'available',
      status_label: 'Available Now',
      installable: true,
      official: true,
      badges: [{ key: 'official', label: 'Official' }],
      category: 'messaging',
      tagline: 'Sell access to Telegram channels and groups through your own bot',
      install_mode: 'paste_credential',
      scopes: ['project', 'platform'],
      capabilities: ['messaging', 'access_control', 'management_surface'],
      resource_kinds: [
        { kind: 'channel', label: 'Channel', portal_label: 'Channel', icon: 'megaphone', grant_mode: 'bearer_link', supports_early_admission_hold: true },
      ],
      install_fields: [
        { name: 'token', type: 'secret', label: 'Bot token', required: true, rules: ['string'], options: [], value: null, steps: [], links: {} },
      ],
      settings_fields: [],
    },
  },
} satisfies Search;
