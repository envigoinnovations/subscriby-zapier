import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_cancellation_feedback',
  noun: 'Cancellation Record',
  display: {
    label: 'Find Cancellation Feedback',
    description:
      "List the cancellation screens a project's members reached, newest first: the member, the plan, the reason they gave, their own words, the offer shown and whether they took it, and where they answered. Narrow by reason or by the surface they answered on.",
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
        key: 'reason',
        label: 'Reason',
        type: 'string',
        required: false,
        choices: {
          too_expensive: 'Too expensive',
          not_using_enough: 'Not using it enough',
          not_enough_content: 'Not enough content',
          content_not_expected: 'Content was not what I expected',
          found_another_community: 'Found another community',
          not_the_right_fit: 'Not the right fit',
          taking_a_break: 'Taking a break',
          got_what_i_needed: 'Got what I needed',
          technical_problems: 'Technical problems',
          signed_up_by_mistake: 'Signed up by mistake',
          other: 'Other',
        },
        helpText: 'Keep only the records whose member gave this reason.',
      },
      {
        key: 'surface',
        label: 'Surface',
        type: 'string',
        required: false,
        choices: { portal: 'Portal', bot: 'Connector chat' },
        helpText: 'Keep only the screens answered on the portal, or in a connector chat.',
      },
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Rows per page, 1–100. Leave blank for the server default of 25.',
      },
      { key: 'page', label: 'Page', type: 'integer', required: false, helpText: '1-indexed.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const params: Record<string, unknown> = {};

      if (bundle.inputData.reason) params.reason = bundle.inputData.reason;
      if (bundle.inputData.surface) params.surface = bundle.inputData.surface;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/retention/cancellations`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '5c1d9e2f-7a3b-4c84-9d6e-1f2a3b4c5d6e',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      subscription_id: '2e4f6a8c-1b3d-4e5f-8a9b-0c1d2e3f4a5b',
      member: { id: 'a7b8c9d0-e1f2-4a3b-8c4d-5e6f7a8b9c0d', name: 'Ada Lovelace' },
      plan: { id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80', name: 'Premium' },
      reason: 'too_expensive',
      feedback: 'Rent went up this month.',
      offer_shown: 'pause',
      offer_taken: 'pause',
      surface: 'portal',
      offer_resumes_at: '2026-11-12T09:00:00+00:00',
      offer_resumed_at: null,
      created_at: '2026-10-12T09:00:00+00:00',
    },
  },
} satisfies Search;
