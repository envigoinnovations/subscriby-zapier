import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_trial_joined',
  noun: 'Member',
  label: 'Trial Member Joined',
  description:
    'Triggers when a subscriber starts a cardless trial, or redeems an access code against a trial plan. A card-captured trial checkout does not fire this.',
  event: 'member.trial_joined',
  sample: {
    id: 'evt_01HXEXAMPLEAAAAAAAAAAAAAAA',
    type: 'member.trial_joined',
    created_at: '2026-05-18T10:30:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
      plan_id: 'pln_01HXPLANSAMPLE0000000000000',
      subscriber_id: 'usr_01HXUSERSAMPLE0000000000000',
      trial_ends_at: '2026-05-25T10:05:00Z',
    },
  },
});
