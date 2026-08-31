import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_roles',
  noun: 'Role',
  display: {
    label: 'New Role (Dropdown)',
    description: 'Powers the Role dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    perform: async (z: ZObject, _bundle: Bundle) => {
      const response = await z.request({ url: `${apiBaseUrl()}/roles` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: { id: 'd05e1a83-7c46-4f29-b613-8ae407c9d251', name: 'Admin' },
  },
} satisfies Trigger;
