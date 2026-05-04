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
    sample: { id: 'team_01HXTEAMSAMPLE0000000000', name: 'My Team' },
  },
} satisfies Trigger;
