import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_activity',
  noun: 'Activity Entry',
  display: {
    label: 'List Activity',
    description: 'List activity log entries for a given subject (project, subscription, member, plan, access-code).',
  },
  operation: {
    inputFields: [
      {
        key: 'subject_type',
        label: 'Subject Type',
        type: 'string',
        required: true,
        helpText: 'One of project, subscription, member, plan, access-code, or a model FQCN.',
      },
      {
        key: 'subject_id',
        label: 'Subject ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the subject.',
      },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '50', helpText: 'Between 1 and 200.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {
        subject_type: bundle.inputData.subject_type,
        subject_id: bundle.inputData.subject_id,
        limit: bundle.inputData.limit ?? 50,
      };

      const response = await z.request({
        url: `${apiBaseUrl()}/activity`,
        params,
      });

      handleHttpError(response, z);

      return ((response.data as { data?: Record<string, unknown>[] }).data ?? []);
    },
    sample: {
      id: '92e4c1b6-70da-4f38-8517-b036ae94d7c2',
      subject_type: 'project',
      subject_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      event: 'project.updated',
      created_at: '2026-05-18T10:05:00Z',
    },
  },
} satisfies Search;
