import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_webhook_endpoints',
  noun: 'Webhook Endpoint',
  display: {
    label: 'New Webhook Endpoint (Dropdown)',
    description: 'Powers the Webhook Endpoint dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    perform: async (z: ZObject, _bundle: Bundle) => {
      const response = await z.request({ url: `${apiBaseUrl()}/webhook-endpoints` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: { id: 'c62a08f4-1b7d-4e35-9860-a37f5d21e0b9', url: 'https://hooks.example.com/mp' },
  },
} satisfies Trigger;
