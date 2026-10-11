import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_links',
  noun: 'Smart Link',
  display: {
    label: 'Find Smart Links',
    description:
      'List a project\'s Smart Links, newest first, each with its three addresses and lifetime clicks; narrow to archived links or to links still in use, or search by name or address. Read "state" on each row: live, expired or archived.',
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
        key: 'archived',
        label: 'Archived',
        type: 'boolean',
        required: false,
        helpText: 'True for archived links only, false for links still in use (expired ones included). Leave blank for every link.',
      },
      {
        key: 'search',
        label: 'Search',
        type: 'string',
        required: false,
        helpText: 'Keep links whose name or address contains this text.',
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

      if (bundle.inputData.archived !== undefined && bundle.inputData.archived !== null && bundle.inputData.archived !== '') {
        params.archived = bundle.inputData.archived;
      }
      if (bundle.inputData.search) params.search = bundle.inputData.search;
      if (bundle.inputData.limit !== undefined && bundle.inputData.limit !== null && bundle.inputData.limit !== '') {
        params.per_page = Math.min(Number(bundle.inputData.limit), 100);
      }
      if (bundle.inputData.page) params.page = bundle.inputData.page;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/links`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '7c2e5a90-3f41-4b8d-9e62-1a0d4c8b7f35',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      name: 'YouTube description',
      slug: 'youtube',
      code: 'K7PMQ2X',
      destination: { type: 'plan', plan_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80', plan_name: 'Premium' },
      urls: {
        web: 'https://my.subscriby.net/jane/go/youtube',
        bot: 'https://t.me/JaneBot?start=via_K7PMQ2X',
        embed: 'https://my.subscriby.net/jane/embed/plans?via=K7PMQ2X',
      },
      state: 'live',
      expires_at: null,
      archived_at: null,
      clicks: { total: 48, last_at: '2026-11-21T09:58:12+00:00' },
      created_at: '2026-11-20T09:14:02+00:00',
      updated_at: '2026-11-21T10:02:40+00:00',
    },
  },
} satisfies Search;
