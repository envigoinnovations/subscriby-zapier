import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'remind_pass_holder',
  noun: 'Subscription',
  label: 'Remind Pass Holder',
  description:
    'Nudge one pass holder who bought a window but has not sent their Telegram join request yet, re-attaching their invite links. Answers reminded: true when Telegram accepted the message and reminded: false when there was nothing to send — no window on the subscription, a window that has ended or been cancelled, a holder who already queued, or one who cannot be reached. False is a normal answer, not an error. Do not repeat the nudge within the same window.',
  inputFields: [
    { key: 'subscription_id', label: 'Subscription ID', type: 'string', required: true, dynamic: 'dropdown_subscriptions.id.id' },
  ],
  path: (input) => `/subscriptions/${input.subscription_id}/remind`,
  sample: { subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4', reminded: true },
});
