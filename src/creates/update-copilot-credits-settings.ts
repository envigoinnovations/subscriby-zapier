import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_copilot_credits_settings',
  noun: 'Copilot Credits Settings',
  display: {
    label: 'Update Copilot Credits Settings',
    description:
      "Change the creator's Copilot Credits settings: the pack the auto top-up buys and under which balance, and the monthly cap on paid credit. Partial: only the fields you fill in change. Switching the auto top-up on needs a card on file.",
  },
  operation: {
    inputFields: [
      {
        key: 'auto_topup_pack',
        label: 'Auto Top-Up Pack',
        type: 'string',
        required: false,
        choices: { starter: 'Starter ($10)', regular: 'Regular ($25, +$2.50 free)', plus: 'Plus ($50, +$7.50 free)', max: 'Max ($100, +$15 free)' },
        helpText: 'The pack bought when the balance falls under the threshold. Leave blank to keep the stored pack.',
      },
      {
        key: 'auto_topup_off',
        label: 'Switch Auto Top-Up Off',
        type: 'boolean',
        required: false,
        helpText: 'Yes switches the auto top-up off, whatever the pack field says.',
      },
      {
        key: 'auto_topup_below_cents',
        label: 'Auto Top-Up Below (Cents)',
        type: 'integer',
        required: false,
        helpText: 'The balance in US cents under which the auto top-up buys, 100 to 10,000. Leave blank to keep the stored threshold.',
      },
      {
        key: 'monthly_spend_cap_cents',
        label: 'Monthly Spend Cap (Cents)',
        type: 'integer',
        required: false,
        helpText: 'The paid credit in US cents the Copilot may draw in a calendar month, 0 to 1,000,000. The free allowance is never capped. Leave blank to keep the stored cap.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const body: Record<string, unknown> = {};

      for (const key of ['auto_topup_pack', 'auto_topup_below_cents', 'monthly_spend_cap_cents']) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value;
        }
      }

      if (bundle.inputData.auto_topup_off === true || bundle.inputData.auto_topup_off === 'true') {
        body.auto_topup_pack = null;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/me/copilot-credits/settings`,
        method: 'PATCH',
        headers: { 'Idempotency-Key': randomUUID(), 'Content-Type': 'application/json' },
        json: body,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? { id: 'copilot-credits-settings', ...data } : response.data;
    },
    sample: {
      id: 'copilot-credits-settings',
      auto_topup_pack: 'regular',
      auto_topup_pack_label: 'Regular Pack',
      auto_topup_below_cents: 500,
      monthly_spend_cap_cents: 2000,
      auto_topup_paused_at: null,
      updated_at: '2026-10-20T08:15:00Z',
    },
  },
} satisfies Create;
