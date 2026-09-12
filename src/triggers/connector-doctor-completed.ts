import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'connector_doctor_completed',
  noun: 'Connector Installation',
  label: 'Connector Doctor Completed',
  description:
    'Triggers when the connector doctor ran on an installation and found something different from the previous run: one finding per check (the installation, then every resource it gates), each with its severity, the connector\'s own state word and sentence, and whether the creator can fix it.',
  event: 'connector.doctor_completed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'connector.doctor_completed',
    created_at: '2026-09-12T10:07:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      connector: 'telegram',
      installation_id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40',
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      ran_at: '2026-09-12T10:07:00+00:00',
      healthy: false,
      critical: 1,
      warnings: 0,
      findings: [
        {
          key: 'installation',
          kind: 'installation',
          severity: 'ok',
          subject: 'Research Bot',
          state: 'connected',
          message: 'The connector still answers for this installation.',
          creator_actionable: false,
          fix_url: null,
          resource_id: null,
        },
        {
          key: 'resource:b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
          kind: 'resource',
          severity: 'critical',
          subject: 'Premium Channel',
          state: 'not_member',
          message: 'The bot was removed from this channel.',
          creator_actionable: true,
          fix_url: 'https://app.subscriby.net/projects/7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13/resources',
          resource_id: 'b73c5f21-9d80-4a6e-8215-4f70ce13a9d6',
        },
      ],
    },
  },
});
