import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

/**
 * A polling trigger over the notification centre: every unread entry of the
 * creator the token belongs to, newest first. Zapier deduplicates on `id`, so
 * each entry fires once however often the poll runs; marking an entry read
 * does not stop a Zap that already saw it.
 */
export default {
  key: 'notification_received',
  noun: 'Notification',
  display: {
    label: 'New Notification',
    description:
      'Triggers when a new entry lands in your notification centre — a sale, a support backlog, a bot or channel that went silent, a billing or security notice, a pass window, an onboarding nudge — with its class, title, body and where it points.',
  },
  operation: {
    type: 'polling' as const,
    perform: async (z: ZObject, _bundle: Bundle) => {
      const response = await z.request({
        url: `${apiBaseUrl()}/me/notifications`,
        params: { unread: 1, per_page: 50 },
      });

      handleHttpError(response, z);

      return (response.data as { data?: { id: string }[] }).data ?? [];
    },
    sample: {
      id: '0b1f6e2a-7c3d-4e5f-8a9b-0c1d2e3f4a5b',
      class: 'support',
      class_label: 'Support',
      title: 'Support backlog in Signals',
      body: 'Three members are waiting for an answer.',
      route: 'projects.inbox',
      params: { projectId: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13' },
      url: 'https://app.subscriby.net/projects/7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13/inbox',
      read: false,
      read_at: null,
      created_at: '2026-09-12T10:05:30+00:00',
    },
  },
} satisfies Trigger;
