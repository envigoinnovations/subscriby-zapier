import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'broadcast_message',
  noun: 'Broadcast',
  display: {
    label: 'Broadcast Message',
    description:
      'Send a Telegram message to a segment of a project’s members. The send is queued and runs in the background — watch the Broadcast Completed trigger for the sent/failed tallies. Cannot be recalled once sent.',
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
        key: 'message',
        label: 'Message',
        type: 'text',
        required: true,
        helpText:
          'Up to 4096 characters. Telegram HTML only: `<b>`, `<i>`, `<u>`, `<s>`, `<a>`, `<code>`, `<pre>`, `<blockquote>`, `<tg-spoiler>`. Anything else is stripped before sending.',
      },
      {
        key: 'audience',
        label: 'Audience',
        type: 'string',
        required: false,
        default: 'all',
        choices: {
          all: 'All Users',
          customer: 'Customers Only',
          trialing: 'Trialing Users',
          lead: 'Leads',
          churned: 'Churned Users',
          all_pass_holders: 'All Active Pass Holders',
          all_pass_holders_not_in_queue: 'All Active Pass Holders Not in Queue',
          pass_holders: 'Active Pass Holders (one window)',
          pass_holders_not_in_queue: 'Active Pass Holders Not in Queue (one window)',
        },
        helpText:
          'Defaults to everyone with a linked chat. The two single-window segments also need a Pass Window ID.',
      },
      {
        key: 'pass_window_id',
        label: 'Pass Window ID',
        type: 'string',
        required: false,
        helpText:
          'Required only for the two single-window pass segments. Ignored by every other audience.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/broadcasts`,
        method: 'POST',
        body: {
          message: bundle.inputData.message,
          audience: bundle.inputData.audience ?? 'all',
          pass_window_id: bundle.inputData.pass_window_id ?? null,
        },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      project_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      audience: 'customer',
      pass_window_id: null,
      recipient_estimate: 128,
      estimated_seconds: 5,
      status: 'queued',
    },
  },
} satisfies Create;
