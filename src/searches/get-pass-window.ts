import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_pass_window',
  noun: 'Pass Window',
  display: {
    label: 'Get Pass Window',
    description: 'Retrieve one dated access window by UUID, with its local range, lifecycle status, whether it is still on sale and how many holders bought it.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'window_id', label: 'Window ID', type: 'string', required: true, helpText: 'UUID of the pass window; find it with Find Pass Windows.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const windowId = bundle.inputData.window_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/pass-windows/${windowId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
      plan_id: '9b7c2e15-4d63-4f80-a2b1-7e5d0c9f3a46',
      plan_name: 'Saturday session',
      starts_at: '2026-10-03T09:00:00+00:00',
      ends_at: '2026-10-03T11:00:00+00:00',
      timezone: 'Europe/London',
      local_range: 'Sat 3 Oct, 10:00–12:00 BST',
      duration_minutes: 120,
      status: 'scheduled',
      source: 'generated',
      sellable: true,
      holders: 12,
    },
  },
} satisfies Search;
