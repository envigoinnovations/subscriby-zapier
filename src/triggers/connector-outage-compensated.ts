import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'connector_outage_compensated',
  noun: 'Connector Outage',
  label: 'Connector Outage Compensated',
  description:
    'Triggers when a closed connector outage settles, once per outage: how many members had the outage length banked on their purchase, how much each received, and how many invites that never reached a member during the outage were re-sent. Fires with zero members when the outage was shorter than an hour, ended by an uninstall, or the project switched Outage Compensation off.',
  event: 'connector.outage_compensated',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'connector.outage_compensated',
    created_at: '2026-09-13T13:21:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      connector: 'telegram',
      extended_seconds: 11700,
      grants_replayed: 2,
      members_extended: 18,
      outage_id: '9c1e4d2a-7b3f-4e8a-a2d1-5f6b7c8d9e0f',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    },
  },
});
