import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'project_payment_method_updated',
  noun: 'Payment Method',
  label: 'Payment Method Updated',
  description:
    "Triggers when a payment gateway's on/off switch, link state or credential keys change. Credentials never travel: when keys are rotated, changes.config.keys names which keys changed and nothing else. Nothing fires when a gateway is first connected — the first thing you hear about a new method is its first update or its deletion.",
  event: 'project.payment_method.updated',
  sample: {
    id: 'evt_01HXEXAMPLEPAYMETHOD0000001',
    type: 'project.payment_method.updated',
    created_at: '2026-09-06T09:20:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      payment_method: {
        id: 'a15d70c8-3e46-4b92-b70f-58c9d2140e63',
        provider: 'paypal',
        mode: 'live',
        active: false,
      },
      changes: {
        active: { from: true, to: false },
      },
    },
  },
});
