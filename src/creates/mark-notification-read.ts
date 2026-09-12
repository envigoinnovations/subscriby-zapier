import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'mark_notification_read',
  noun: 'Notification',
  label: 'Mark Notification Read',
  description:
    'Mark one entry of your notification centre as read, so the dashboard bell stops counting it. An entry already read keeps its first read time.',
  inputFields: [
    {
      key: 'notification_id',
      label: 'Notification ID',
      type: 'string',
      required: true,
      helpText: 'From List Notifications or the New Notification trigger.',
    },
  ],
  path: (input) => `/me/notifications/${input.notification_id as string}/read`,
  sample: {
    id: '0b1f6e2a-7c3d-4e5f-8a9b-0c1d2e3f4a5b',
    class: 'support',
    class_label: 'Support',
    title: 'Support backlog in Signals',
    body: 'Three members are waiting for an answer.',
    route: 'projects.inbox',
    params: { projectId: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13' },
    url: 'https://app.subscriby.net/projects/7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13/inbox',
    read: true,
    read_at: '2026-09-12T10:35:00+00:00',
    created_at: '2026-09-12T10:05:30+00:00',
  },
});
