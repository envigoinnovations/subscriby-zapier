import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_connector',
  noun: 'Connector',
  display: {
    label: 'Get Connector',
    description:
      'Retrieve one Connector Directory card by key — its lane, badges and, for a connector that exists as a package, its manifest and the form that connects it.',
  },
  operation: {
    inputFields: [
      { key: 'connector', label: 'Connector', type: 'string', required: true, dynamic: 'dropdown_connectors.id.name' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const connector = bundle.inputData.connector as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/connectors/${encodeURIComponent(connector)}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: { key: string } }).data;

      return data ? [{ ...data, id: data.key }] : [];
    },
    sample: {
      id: 'telegram',
      key: 'telegram',
      name: 'Telegram',
      vendor: 'Subscriby',
      version: '0.1.0',
      status: 'available',
      status_label: 'Available Now',
      installable: true,
      official: true,
      badges: [{ key: 'official', label: 'Official' }],
      category: 'messaging',
      tagline: 'Sell access to Telegram channels and groups through your own bot',
      install_mode: 'paste_credential',
      capabilities: ['messaging', 'access_control', 'management_surface', 'recovery_probes'],
      messaging: { max_length: 4096, buttons_per_row: 8, max_buttons: 100, callback_data_bytes: 64, supports_underline: true, supports_spoiler: true, supports_files: true },
      recovery: { probes: true, standby_installations: true, resource_standby: false, mirror: false, identity_relink: false },
    },
  },
} satisfies Search;
