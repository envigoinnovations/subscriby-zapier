import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_converted',
  noun: 'Member',
  label: 'Member Converted',
  description:
    'Triggers when a trialing subscriber converts into a paying customer. Currently emitted for Stripe only.',
  event: 'member.converted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'member.converted',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      provider: 'stripe',
    },
  },
});
