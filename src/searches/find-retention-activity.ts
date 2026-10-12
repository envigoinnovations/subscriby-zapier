import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_retention_activity',
  noun: 'Retention Activity',
  display: {
    label: 'Find Retention Activity',
    description:
      "List a project's Revenue Recovery ledger, newest first: one row per notice, offer, feedback and win-back message the programme sent, with the member, the channel that carried it, the coupon and the sequence step behind a win-back message, and whether a charge settled for the member afterwards. Narrow to one kind of row.",
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
        key: 'kind',
        label: 'Kind',
        type: 'string',
        required: false,
        choices: {
          payment_failed_notice: 'Payment failed notice',
          grace_reminder: 'Grace reminder',
          grace_final_warning: 'Grace final warning',
          access_suspended: 'Access paused',
          access_restored: 'Access restored',
          payment_recovered: 'Payment recovered',
          offer_shown: 'Offer shown',
          offer_taken: 'Offer taken',
          feedback: 'Feedback',
          sequence_step: 'Win-back step',
        },
        helpText: 'Keep only one kind of row.',
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

      if (bundle.inputData.kind) params.kind = bundle.inputData.kind;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/retention/activity`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '8f0a2b4c-6d8e-4f1a-9b2c-3d4e5f6a7b8c',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      subscription_id: '2e4f6a8c-1b3d-4e5f-8a9b-0c1d2e3f4a5b',
      member: { id: 'a7b8c9d0-e1f2-4a3b-8c4d-5e6f7a8b9c0d', name: 'Ada Lovelace' },
      kind: 'payment_recovered',
      channel: 'chat',
      sent_at: '2026-10-12T09:00:00+00:00',
      converted_at: '2026-10-12T09:00:00+00:00',
      payment_id: 'c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f',
      coupon: null,
      step: null,
      meta: null,
    },
  },
} satisfies Search;
