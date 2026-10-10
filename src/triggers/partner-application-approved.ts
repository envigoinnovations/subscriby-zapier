import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'partner_application_approved',
  noun: 'Partner Application',
  label: 'Partner Application Approved',
  description:
    'Triggers when Subscriby approves your Partner Program application: your code is minted, your starting rate is set and your link attributes from this moment; "proof_due_at" says when proof of your commitments is due.',
  event: 'partner.application_approved',
  sample: {
    id: 'evt_01HXEXAMPLEPARTNER00000008',
    type: 'partner.application_approved',
    created_at: '2026-11-18T10:02:41Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      partner_id: '2f6c1d0e-9a3b-4c5d-8e7f-6a5b4c3d2e1f',
      code: 'K7PQ2MX',
      commission_percent: '5.00',
      joined_at: '2026-11-18T10:02:41+00:00',
      proof_due_at: '2027-01-17T10:02:41+00:00',
    },
  },
});
