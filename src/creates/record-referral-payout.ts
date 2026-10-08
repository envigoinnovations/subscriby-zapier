import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'record_referral_payout',
  noun: 'Referral Payout',
  display: {
    label: 'Record Referral Payout',
    description:
      'Record a payout you made to an affiliate outside Subscriby, so the ledger marks their oldest payable commissions in that currency as paid, first in first out, until the amount is covered. The amount is capped at the affiliate\'s payable balance in that currency; read it with Get Referral Affiliate first. Raises Referral Payout Recorded.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      {
        key: 'affiliate_id',
        label: 'Affiliate ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the affiliate who was paid; find it with Find Referral Affiliates.',
      },
      { key: 'amount', label: 'Amount', type: 'number', required: true, helpText: 'What was paid, greater than 0 and at most the affiliate\'s payable balance in the currency.' },
      { key: 'currency_id', label: 'Currency ID', type: 'string', required: true, helpText: 'Currency row id the commissions were earned in; a balance exists per currency.' },
      { key: 'reference', label: 'Reference', type: 'string', required: false, helpText: 'Your own reference, such as a transfer id. At most 120 characters.' },
      { key: 'note', label: 'Note', type: 'text', required: false, helpText: 'A note for your records. At most 1,000 characters.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {
        affiliate_id: bundle.inputData.affiliate_id,
        amount: bundle.inputData.amount,
        currency_id: bundle.inputData.currency_id,
      };

      for (const key of ['reference', 'note'] as const) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/referral-payouts`,
        method: 'POST',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      affiliate_id: '0b1c2d3e-4f50-4617-8a9b-0c1d2e3f4a5b',
      amount: '30.0000',
      currency_id: 'f0e1d2c3-b4a5-4697-8877-665544332211',
      currency: 'USD',
      reference: 'PAYPAL-7F3D1C92',
      note: null,
      paid_at: '2026-11-01T10:00:00+00:00',
      recorded_by_user_id: 'd4e5f6a7-b8c9-4d0e-8f1a-2b3c4d5e6f70',
      rewards_paid: 3,
      created_at: '2026-11-01T10:00:00+00:00',
    },
  },
} satisfies Create;
