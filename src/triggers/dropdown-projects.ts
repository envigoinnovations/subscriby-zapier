import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'dropdown_projects',
  noun: 'Project',
  display: {
    label: 'New Project (Dropdown)',
    description: 'Powers the Project dropdown in action and search fields.',
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    perform: async (z: ZObject, _bundle: Bundle) => {
      const response = await z.request({ url: `${apiBaseUrl()}/projects` });
      handleHttpError(response, z);
      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: {
      id: 'prj_01HXPROJECTSAMPLE000000000',
      name: 'Research Premium',
    },
  },
} satisfies Trigger;
