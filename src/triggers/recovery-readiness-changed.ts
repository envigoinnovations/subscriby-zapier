import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'recovery_readiness_changed',
  noun: 'Recovery Readiness',
  label: 'Recovery Readiness Changed',
  description:
    'Triggers when a line of the Disaster Recovery readiness checklist changes state: a standby registered or lost, a backup account linked, a connector installed or removed. Carries the totals and every open line, so a Zap can nag about what is still missing.',
  event: 'recovery.readiness_changed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'recovery.readiness_changed',
    created_at: '2026-09-12T03:19:42Z',
    api_version: '2026-05-01',
    project_id: null,
    data: {
      completed: 4,
      total: 6,
      complete: false,
      items: [
        { key: 'second_factor', connector: null, done: true, locked: false },
        { key: 'backup_identity', connector: null, done: true, locked: false },
        { key: 'standby_installation', connector: 'telegram', done: true, locked: false },
        { key: 'standby_spaces', connector: 'telegram', done: false, locked: false },
        { key: 'auto_failover', connector: 'telegram', done: true, locked: false },
        { key: 'live_mirror', connector: 'telegram', done: false, locked: false },
      ],
      changed: ['telegram:standby_spaces', 'telegram:live_mirror'],
    },
  },
});
