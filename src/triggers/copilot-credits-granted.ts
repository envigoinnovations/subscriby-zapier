import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'copilot_credits_granted',
  noun: 'Copilot Credits',
  label: 'Copilot Credits Granted',
  description:
    'Triggers when free Copilot Credits are granted to your account: the welcome credit at sign-up, a promotion or goodwill from Subscriby. "kind" says why, "cents" how much, "expires_at" when it lapses (null on a grant that never does) and "balance_cents" the whole balance after the grant. The paid part and the bonus of a pack are announced by Copilot Credits Purchased, never here.',
  event: 'copilot_credits.granted',
  sample: {
    id: 'evt_01HXEXAMPLECOPILOT0000002',
    type: 'copilot_credits.granted',
    created_at: '2026-11-02T09:14:31Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      grant_id: '7c8d9e0f-1a2b-4c3d-9e4f-5a6b7c8d9e0f',
      kind: 'signup',
      cents: 500,
      expires_at: '2027-01-31T09:14:31Z',
      balance_cents: 500,
    },
  },
});
