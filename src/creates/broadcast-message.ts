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
          expiring_soon: 'Expiring Soon',
          cancelled_still_active: 'Cancelled, Still Inside Their Period',
          paused: 'Paused Subscriptions',
          trialing_cardless: 'Trialing Without a Card',
          all_pass_holders: 'All Active Pass Holders',
          all_pass_holders_not_in_queue: 'All Active Pass Holders Not in Queue',
          pass_holders: 'Active Pass Holders (one window)',
          pass_holders_not_in_queue: 'Active Pass Holders Not in Queue (one window)',
        },
        helpText:
          'Defaults to everyone with a linked chat. The two single-window segments also need a Pass Window ID. Expiring Soon reads the Running Out Within field.',
      },
      {
        key: 'pass_window_id',
        label: 'Pass Window ID',
        type: 'string',
        required: false,
        helpText:
          'Required only for the two single-window pass segments. Ignored by every other audience.',
      },
      {
        key: 'plan_id',
        label: 'Narrow to a Plan',
        type: 'string',
        required: false,
        dynamic: 'dropdown_plans.id.name',
        helpText:
          'Optional. Narrows the audience above to one plan rather than replacing it — Customers plus a plan reaches people paying for it right now, Churned plus a plan reaches people who held it and left. Rejected for Leads (they never subscribed) and for the pass segments (their plan is implied by the window).',
      },
      {
        key: 'expiring_within_days',
        label: 'Running Out Within (Days)',
        type: 'integer',
        required: false,
        default: '7',
        helpText:
          'Only used by the Expiring Soon audience, 1-90. Members are counted only if their access genuinely lapses: a subscription that renews by itself is not expiring, so someone appears only once they have turned renewal off.',
      },    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/broadcasts`,
        method: 'POST',
        body: {
          message: bundle.inputData.message,
          audience: bundle.inputData.audience ?? 'all',
          pass_window_id: bundle.inputData.pass_window_id ?? null,
          plan_id: bundle.inputData.plan_id ?? null,
          expiring_within_days: bundle.inputData.expiring_within_days ?? null,
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
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      expiring_within_days: null,
      recipient_estimate: 128,
      estimated_seconds: 5,
      status: 'queued',
    },
  },
} satisfies Create;
