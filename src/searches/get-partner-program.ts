import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';
import { PARTNER_SAMPLE } from '../utils/partner-sample';

export default {
  key: 'get_partner_program',
  noun: 'Partner Program',
  display: {
    label: 'Get Partner Program',
    description:
      'Retrieve where the token\'s creator stands in the Partner Program, Subscriby\'s own programme that pays a share of every invoice the creators you bring to Subscriby pay: the application\'s state, your code and links once approved, the commission ladder, the referral tallies, the balances, the payout rail and whether it is complete (never the destination itself), the tax declaration, the terms and your commitments. Returns no rows until you apply, which is done on the dashboard or in the bot.',
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
        url: `${apiBaseUrl()}/me/partner`,
        skipThrowForStatus: true,
      });

      if (response.status === 404) {
        return [];
      }

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: PARTNER_SAMPLE,
  },
} satisfies Search;
