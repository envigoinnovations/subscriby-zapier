import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_subscriptions',
  noun: 'Subscription',
  display: {
    label: 'New Subscription (Dropdown)',
    description: 'Powers the Subscription dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    perform: async (z: ZObject, _bundle: Bundle) => {
      const response = await z.request({ url: `${apiBaseUrl()}/subscriptions` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: { id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4', status: 'active' },
  },
} satisfies Trigger;
