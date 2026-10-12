import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_retention_stats',
  noun: 'Retention Stats',
  display: {
    label: 'Get Retention Stats',
    description:
      "Read what Revenue Recovery did on a project over a period: the failed renewals, reminders, pauses, recoveries with what they brought back in US dollars, restorations, win-back messages and members won back, the cancellation screens with the offers shown and taken, why members cancelled, and the leads, checkouts and trials the sequences nurtured with what the recovered checkouts were worth. The members in grace and paused right now ignore the period.",
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
        key: 'period',
        label: 'Period',
        type: 'string',
        required: false,
        choices: {
          '7d': 'Last 7 days',
          '14d': 'Last 14 days',
          '30d': 'Last 30 days',
          '60d': 'Last 60 days',
          '90d': 'Last 90 days',
          '1y': 'Last year',
          mtd: 'Month to date',
          qtd: 'Quarter to date',
          ytd: 'Year to date',
          all: 'All time',
        },
        helpText: 'The window the figures cover. Leave blank for the last 30 days.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const params: Record<string, unknown> = {};

      if (bundle.inputData.period) params.period = bundle.inputData.period;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/retention/stats`,
        params,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      period: '30d',
      range: { from: '2026-09-12', to: '2026-10-12' },
      failed_renewals: 14,
      reminders_sent: 9,
      access_paused: 3,
      payments_recovered: 8,
      recovered_usd: '212.00',
      access_restored: 2,
      in_grace_now: 2,
      paused_now: 1,
      winback_sent: 11,
      won_back: 2,
      cancellations: 6,
      offers_shown: 4,
      offers_taken: 1,
      reasons: [
        { reason: 'too_expensive', label: 'Too expensive', count: 3, share_percent: 50 },
        { reason: 'taking_a_break', label: 'Taking a break', count: 2, share_percent: 33.3 },
        { reason: 'other', label: 'Other', count: 1, share_percent: 16.7 },
      ],
      leads_arrived: 40,
      leads_nurtured: 31,
      leads_converted: 5,
      checkouts_started: 27,
      checkouts_stalled: 9,
      checkouts_recovered: 3,
      checkouts_recovered_usd: '87.00',
      trials_nurtured: 6,
      trials_saved: 2,
    },
  },
} satisfies Search;
