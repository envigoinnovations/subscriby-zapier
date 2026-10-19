import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_copilot_credits',
  noun: 'Copilot Credits',
  display: {
    label: 'Get Copilot Credits',
    description:
      "Retrieve the creator's Copilot Credits in one object: the balance split into free and paid with what lapses next, this month's free allowance used and left, this month's usage, the per-unit prices, the packs on sale and the auto top-up and cap. Every amount is in US cents.",
  },
  operation: {
    inputFields: [
      {
        key: 'refresh',
        label: 'Refresh',
        type: 'boolean',
        required: false,
        helpText: 'Ignored — present because Zapier requires every search to accept at least one input field. Leave blank.',
      },
    ],
    async perform(z: ZObject, _bundle: Bundle) {
      const response = await z.request({
        url: `${apiBaseUrl()}/me/copilot-credits`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [{ id: 'copilot-credits', ...data }] : [];
    },
    sample: {
      id: 'copilot-credits',
      balance: {
        total_cents: 3250,
        free_cents: 750,
        paid_cents: 2500,
        lapsing_cents: 500,
        lapsing_at: '2027-01-16T00:00:00Z',
        exhausted: false,
      },
      allowance: {
        period_start: '2026-10-01',
        turns_used: 12,
        turns_limit: 25,
        turns_left: 13,
        answers_used: 40,
        answers_limit: 250,
        answers_left: 210,
      },
      turns_this_month: 12,
      suggestions_this_month: 4,
      answers_this_month: 40,
      paid_spent_this_month_cents: 0,
      price_turn_cents: 10,
      price_suggestion_cents: 5,
      price_answer_cents: 1,
      long_turn_steps: 4,
      max_turn_steps: 8,
      low_balance_cents: 500,
      packs: [
        { pack: 'starter', label: 'Starter Pack', paid_cents: 1000, bonus_cents: 0, total_cents: 1000 },
        { pack: 'regular', label: 'Regular Pack', paid_cents: 2500, bonus_cents: 250, total_cents: 2750 },
      ],
      settings: {
        auto_topup_pack: 'regular',
        auto_topup_pack_label: 'Regular Pack',
        auto_topup_below_cents: 500,
        monthly_spend_cap_cents: 2000,
        auto_topup_paused_at: null,
        updated_at: '2026-10-12T09:20:00Z',
      },
    },
  },
} satisfies Search;
