import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_pass_roster',
  noun: 'Pass Roster Row',
  display: {
    label: 'Find Pass Roster Rows',
    description:
      "List a project's Pass Roster: one row per member against the dates its pass plans sell, with their standing on each date they hold (in, queued, holds, missed, ended or covered) and the cancelled dates they were moved off with where they went. The columns, the dates beyond the span that holders were moved onto and every move off a column folded by destination ride on each row under meta, so a Zap reads them without a second step.",
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
        helpText: 'Keep to one pass or series plan: its dates and its holders. Leave empty for every plan that sells dates.',
      },
      {
        key: 'search',
        label: 'Member Search',
        type: 'string',
        required: false,
        helpText: 'Keep the members whose name or email contains this text, up to 100 characters.',
      },
      {
        key: 'from',
        label: 'Span Starts',
        type: 'datetime',
        required: false,
        helpText: 'Only dates ending at or after this moment are columns. Eight weeks before now when empty.',
      },
      {
        key: 'to',
        label: 'Span Ends',
        type: 'datetime',
        required: false,
        helpText: 'Only dates starting at or before this moment are columns. Eight weeks after now when empty.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      if (!projectId) {
        return [];
      }

      const params: Record<string, unknown> = { per_page: 100 };

      for (const key of ['plan_id', 'search', 'from', 'to']) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          params[key] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/pass-roster`,
        params,
      });

      handleHttpError(response, z);

      const body = response.data as {
        data?: Array<{ member: { id: string } } & Record<string, unknown>>;
        meta?: Record<string, unknown>;
      };
      const meta = body.meta ?? {};

      return (body.data ?? []).map((row) => ({
        id: row.member.id,
        ...row,
        meta: {
          span: meta.span ?? null,
          dates: meta.dates ?? [],
          moved_to_dates: meta.moved_to_dates ?? [],
          relocations: meta.relocations ?? [],
        },
      }));
    },
    sample: {
      id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      member: {
        id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
        project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
        username: 'gus',
        first_name: 'Gus',
        last_name: 'Moved',
        status: 'customer',
        joined_at: '2026-10-02T18:40:11Z',
        created_at: '2026-10-02T18:40:11Z',
        updated_at: '2026-11-06T09:15:02Z',
      },
      dates: [
        {
          window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
          standing: 'holds',
          claim_id: 'c1f2e3d4-5a6b-4c7d-8e9f-0a1b2c3d4e5f',
          subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
          plan_name: 'Thursday Football Pass',
          from_series: false,
          moved_from_window_id: '9c1f4e27-5a8b-4d63-b2e0-8f7a6c5d4e31',
          last_reminded_at: null,
        },
      ],
      departures: [
        {
          window_id: '9c1f4e27-5a8b-4d63-b2e0-8f7a6c5d4e31',
          to_window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
          reason: 'window_cancelled',
          moved_at: '2026-11-06T09:15:02Z',
          move_id: '0f9e8d7c-6b5a-4f3e-9d2c-1b0a9f8e7d6c',
        },
      ],
      meta: {
        span: { from: '2026-09-11T12:00:00Z', to: '2027-01-01T12:00:00Z' },
        dates: [
          {
            id: '9c1f4e27-5a8b-4d63-b2e0-8f7a6c5d4e31',
            plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
            plan_name: 'Thursday Football Pass',
            starts_at: '2026-11-05T21:30:00Z',
            ends_at: '2026-11-06T06:00:00Z',
            timezone: 'America/Chicago',
            local_range: 'Thu 5 Nov 2026, 15:30 – Fri 6 Nov, 00:00 CST',
            status: 'canceled',
          },
          {
            id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
            plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
            plan_name: 'Thursday Football Pass',
            starts_at: '2026-11-12T21:30:00Z',
            ends_at: '2026-11-13T06:00:00Z',
            timezone: 'America/Chicago',
            local_range: 'Thu 12 Nov 2026, 15:30 – Fri 13 Nov, 00:00 CST',
            status: 'scheduled',
          },
        ],
        moved_to_dates: [],
        relocations: [
          {
            from_window_id: '9c1f4e27-5a8b-4d63-b2e0-8f7a6c5d4e31',
            to_window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
            count: 12,
            last_moved_at: '2026-11-06T09:15:02Z',
          },
        ],
      },
    },
  },
} satisfies Search;
