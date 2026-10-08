import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'referral_program_updated',
  noun: 'Referral Program',
  label: 'Referral Program Updated',
  description:
    'Triggers when a project\'s Referral Program is set up, changed, paused or switched back on. The payload carries the whole programme and a "changes" map of the fields that moved with their old and new values; a first save reports every field as new. Rewards already in the ledger keep their figures, so a change here is never retroactive.',
  event: 'referral.program_updated',
  sample: {
    id: 'evt_01HXEXAMPLEREFERRAL00000001',
    type: 'referral.program_updated',
    created_at: '2026-10-08T09:00:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      program: {
        id: '6e2a7a4f-3b8c-4c21-9f6d-2a3b4c5d6e7f',
        active: true,
        customers_only: false,
        approval_required: false,
        reward_kind: 'cash',
        reward_days: null,
        commission_type: 'percentage',
        commission_value: '20.0000',
        commission_currency_id: null,
        commission_period_months: 6,
        hold_days: 14,
        minimum_payout: '50.0000',
        friend_reward_kind: 'free_days',
        friend_reward_days: 3,
        friend_coupon_id: null,
        payout_details_label: 'PayPal email',
        plan_ids: [],
      },
      changes: {
        commission_value: { from: '15.0000', to: '20.0000' },
      },
    },
  },
});
