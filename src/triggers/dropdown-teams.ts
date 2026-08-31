import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_teams',
  noun: 'Team',
  display: {
    label: 'New Team (Dropdown)',
    description: 'Powers the Team dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    perform: async (z: ZObject, _bundle: Bundle) => {
      const response = await z.request({ url: `${apiBaseUrl()}/teams` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: { id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86', name: 'My Team' },
  },
} satisfies Trigger;
