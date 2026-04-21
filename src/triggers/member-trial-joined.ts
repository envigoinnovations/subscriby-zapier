import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'member_trial_joined',
  noun: 'Member',
  label: 'Trial Member Joined',
  description:
    'Triggers when a subscriber joins via a free-trial (cardless or card-captured). Use for trial-onboarding sequences, concierge outreach, and trial-conversion tracking.',
  event: 'member.trial_joined',
  sample: {
    id: 'evt_01HXEXAMPLEAAAAAAAAAAAAAAA',
    type: 'member.trial_joined',
    created_at: '2026-05-18T10:30:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      subscription: {
        id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        plan_id: 'pln_01HXPLANSAMPLE0000000000000',
        status: 'trialing',
        trial_ends_at: '2026-05-25T10:30:00Z',
      },
      subscriber: {
        id: 'usr_01HXUSERSAMPLE0000000000000',
        telegram_user_id: '123456789',
      },
    },
  },
});
