import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';
import { PARTNER_REFERRAL_SAMPLE } from '../utils/partner-sample';

export default {
  key: 'get_partner_referral',
  noun: 'Partner Referral',
  display: {
    label: 'Get Partner Referral',
    description:
      'Retrieve one creator you referred by the referral\'s UUID: how they arrived, whether their first paid invoice converted them and on which plan, the rate locked onto them and until when you earn on them. Returns no rows for another partner\'s referral.',
  },
  operation: {
    inputFields: [
      {
        key: 'referral_id',
        label: 'Referral ID',
        type: 'string',
        required: true,
        helpText: 'From Find Partner Referrals or the New Partner Referral trigger.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const referralId = bundle.inputData.referral_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/me/partner/referrals/${referralId}`,
        skipThrowForStatus: true,
      });

      if (response.status === 404) {
        return [];
      }

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: PARTNER_REFERRAL_SAMPLE,
  },
} satisfies Search;
