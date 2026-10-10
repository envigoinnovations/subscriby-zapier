import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';
import { PARTNER_SAMPLE } from '../utils/partner-sample';

/** The text fields the body takes, sent only when the Zap filled them. */
const TEXT_FIELDS = [
  'details',
  'bank_holder',
  'bank_name',
  'bank_country',
  'bank_account_number',
  'bank_swift',
  'bank_branch_code',
  'bank_address',
  'legal_name',
  'tax_country',
] as const;

export default {
  key: 'update_partner_payout_details',
  noun: 'Partner Program',
  display: {
    label: 'Update Partner Payout Details',
    description:
      'Write how you are paid as a partner: the rail, what it pays to (the PayPal email, the USDT wallet, or the bank account for Wise and Remitly) and the tax declaration every cash rail needs. Only the destination the chosen rail uses is kept, encrypted; nothing ever returns it. A rail cannot be saved until you have accepted the Partner Program Terms: tick Accept Terms here or run Accept Partner Terms first.',
  },
  operation: {
    inputFields: [
      {
        key: 'method',
        label: 'Payout Method',
        type: 'string',
        required: true,
        choices: {
          credit: 'Subscriby Credit on your own invoices (while the rail is open)',
          paypal: 'PayPal',
          wise: 'Wise (bank account)',
          remitly: 'Remitly (bank account)',
          crypto: 'USDT on TRC20',
        },
      },
      { key: 'details', label: 'PayPal Email or Wallet Address', type: 'string', required: false, helpText: 'For PayPal and USDT. At most 190 characters.' },
      { key: 'bank_holder', label: 'Account Holder', type: 'string', required: false, helpText: 'The name on the bank account, for Wise and Remitly.' },
      { key: 'bank_name', label: 'Bank', type: 'string', required: false, helpText: 'For Wise and Remitly.' },
      { key: 'bank_country', label: 'Bank Country', type: 'string', required: false, helpText: 'Two-letter ISO country code, for Wise and Remitly.' },
      { key: 'bank_account_number', label: 'Account Number or IBAN', type: 'string', required: false, helpText: 'Letters, digits, spaces and dashes, at most 40 characters, for Wise and Remitly.' },
      { key: 'bank_swift', label: 'SWIFT or BIC', type: 'string', required: false, helpText: 'Optional, 8 or 11 characters.' },
      { key: 'bank_branch_code', label: 'Branch, Routing, Sort or IFSC Code', type: 'string', required: false, helpText: 'Optional, when the transfer needs one.' },
      { key: 'bank_address', label: 'Account Holder Address', type: 'string', required: false, helpText: 'Optional, when the transfer needs one.' },
      { key: 'legal_name', label: 'Legal Name', type: 'string', required: false, helpText: 'The name a payment is made out to. Required on every cash rail.' },
      { key: 'tax_country', label: 'Tax Country', type: 'string', required: false, helpText: 'Two-letter ISO code of your country of tax residence. Required on every cash rail.' },
      { key: 'us_person', label: 'US Person', type: 'boolean', required: false, helpText: 'Whether you are a US person for tax purposes.' },
      { key: 'accept_terms', label: 'Accept Terms', type: 'boolean', required: false, helpText: 'Accept the Partner Program Terms with this save.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const body: Record<string, unknown> = { method: bundle.inputData.method };

      for (const field of TEXT_FIELDS) {
        const value = bundle.inputData[field];

        if (value !== undefined && value !== null && value !== '') {
          body[field] = value;
        }
      }

      if (bundle.inputData.us_person !== undefined && bundle.inputData.us_person !== null && bundle.inputData.us_person !== '') {
        body.us_person = Boolean(bundle.inputData.us_person);
      }

      if (bundle.inputData.accept_terms) {
        body.accept_terms = true;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/me/partner/payout-details`,
        method: 'PUT',
        headers: { 'Idempotency-Key': randomUUID() },
        body,
      });

      handleHttpError(response, z);

      return (response.data as { data: Record<string, unknown> }).data;
    },
    sample: PARTNER_SAMPLE,
  },
} satisfies Create;
