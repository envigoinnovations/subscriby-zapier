import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'partner_application_rejected',
  noun: 'Partner Application',
  label: 'Partner Application Rejected',
  description:
    'Triggers when Subscriby declines your Partner Program application, with the reason you were given and the day you may apply again.',
  event: 'partner.application_rejected',
  sample: {
    id: 'evt_01HXEXAMPLEPARTNER00000009',
    type: 'partner.application_rejected',
    created_at: '2026-11-18T10:02:41Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      partner_id: '2f6c1d0e-9a3b-4c5d-8e7f-6a5b4c3d2e1f',
      reason: 'Your audience is outside the communities we serve today.',
      reapply_at: '2027-02-16T10:02:41+00:00',
    },
  },
});
