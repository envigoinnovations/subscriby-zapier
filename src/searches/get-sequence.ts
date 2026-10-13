import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';
import { sequenceSample } from '../creates/create-sequence';

export default {
  key: 'get_sequence',
  noun: 'Sequence',
  display: {
    label: 'Get Sequence',
    description:
      'Retrieve one recovery sequence by UUID: its name, trigger, switch, its steps in order with the coupon each carries, and how it has done. Find Sequence Enrollments has the members behind the counts.',
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
        key: 'sequence_id',
        label: 'Sequence ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the sequence. Find it with Find Sequences.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const sequenceId = bundle.inputData.sequence_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/sequences/${sequenceId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: sequenceSample,
  },
} satisfies Search;
