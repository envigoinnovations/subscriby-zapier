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
    sample: { id: 'sub_01HXSUBSAMPLE00000000000000', status: 'active' },
  },
} satisfies Trigger;
