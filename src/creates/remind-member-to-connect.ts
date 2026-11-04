import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'remind_member_to_connect',
  noun: 'Subscription',
  label: 'Remind Member to Connect',
  description:
    'Remind one member that a place of their purchase still waits for an account they have not connected (a place on one platform bought through the bot of another, say), by mail and in the chat their connected account reaches, with the door that connects it. Answers reminded: true when the message went out and reminded: false when there was nothing to send: no place waits, the member was reminded within the last day or stopped the follow-ups, or the purchase has ended. False is a normal answer, not an error. The daily reminder already nudges every waiting member once on its own; find the candidates with List Members and Access set to waiting.',
  inputFields: [
    { key: 'subscription_id', label: 'Subscription ID', type: 'string', required: true, dynamic: 'dropdown_subscriptions.id.id' },
  ],
  path: (input) => `/subscriptions/${input.subscription_id}/remind-connection`,
  sample: { subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4', reminded: true },
});
