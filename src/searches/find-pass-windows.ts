import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_pass_windows',
  noun: 'Pass Window',
  display: {
    label: 'Find Pass Windows',
    description:
      "List the dated access windows a project's time-limited pass plans generate, with their IDs. This is where the Pass Window IDs for a Pass Series come from — a series points at windows that already exist rather than creating any, so run this first, then feed the IDs into Create Plan.",
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      {
        key: 'plan_id',
        label: 'Pass Plan ID',
        type: 'string',
        required: false,
        dynamic: 'dropdown_plans.id.name',
        helpText: 'Narrow to one pass plan. Leave empty for every pass plan on the project.',
      },
      {
        key: 'status',
        label: 'Status',
        type: 'string',
        required: false,
        choices: {
          scheduled: 'Scheduled — not yet open',
          open: 'Open — running now',
          closed: 'Closed — finished',
          canceled: 'Canceled',
        },
      },
      {
        key: 'sellable_only',
        label: 'On Sale Only',
        type: 'boolean',
        required: false,
        helpText:
          "Only windows a customer can buy right now, after the plan's sales cutoff. Not the same as Status: a scheduled window may already be closed to sales, and a plan anchored to the window end keeps selling while it runs.",
      },
      {
        key: 'from',
        label: 'Starting After',
        type: 'datetime',
        required: false,
        helpText: 'Only windows starting at or after this moment.',
      },
      {
        key: 'to',
        label: 'Starting Before',
        type: 'datetime',
        required: false,
        helpText: 'Only windows starting at or before this moment.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      if (!projectId) {
        return [];
      }

      const params: Record<string, unknown> = {};

      for (const key of ['plan_id', 'status', 'from', 'to']) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          params[key] = value;
        }
      }

      if (bundle.inputData.sellable_only) {
        params.sellable_only = true;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/pass-windows`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      plan_name: 'Match Day Pass',
      starts_at: '2026-09-20T13:00:00Z',
      ends_at: '2026-09-20T16:00:00Z',
      timezone: 'America/New_York',
      local_range: 'Sun 20 Sep 2026, 09:00 – 12:00 EDT',
      duration_minutes: 180,
      status: 'scheduled',
      source: 'generated',
      sellable: true,
      holders: 12,
    },
  },
} satisfies Search;
