import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_tokens',
  noun: 'Token',
  display: {
    label: 'New Token (Dropdown)',
    description: 'Powers the Token dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    perform: async (z: ZObject, _bundle: Bundle) => {
      const response = await z.request({ url: `${apiBaseUrl()}/tokens` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: { id: 'tok_01HXTOKENSAMPLE0000000000', name: 'Zapier Token' },
  },
} satisfies Trigger;
