import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_groups',
  noun: 'Group',
  display: {
    label: 'New Group (Dropdown)',
    description: 'Powers the Group dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    perform: async (z: ZObject, _bundle: Bundle) => {
      const response = await z.request({ url: `${apiBaseUrl()}/groups` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: { id: '1f68d92a-04c5-4e83-97b1-3d6a05e2f847', name: 'VIP Members' },
  },
} satisfies Trigger;
