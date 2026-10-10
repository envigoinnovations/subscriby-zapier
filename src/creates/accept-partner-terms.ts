import { defineRpcCreate } from '../utils/rpc-create';
import { PARTNER_SAMPLE } from '../utils/partner-sample';

export default defineRpcCreate({
  key: 'accept_partner_terms',
  noun: 'Partner Program',
  label: 'Accept Partner Terms',
  description:
    'Record that you accept the Partner Program Terms as they stand today, which every payout rail requires; running it again after the terms change is the same call. Refused while your application is under review or was declined.',
  inputFields: [],
  path: () => '/me/partner/terms/accept',
  sample: PARTNER_SAMPLE,
});
