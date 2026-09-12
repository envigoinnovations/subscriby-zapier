import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'list_notifications',
  noun: 'Notification',
  display: {
    label: 'List Notifications',
    description:
      'List the entries of your notification centre, newest first — every alert Subscriby sent you, with its class, title, body, where it points and whether it was read — or only the unread ones, or one class.',
  },
  operation: {
    inputFields: [
      {
        key: 'unread',
        label: 'Unread Only',
        type: 'boolean',
        required: false,
        helpText: 'Yes lists only the entries you have not opened yet; leave blank for every entry.',
      },
      {
        key: 'class',
        label: 'Class',
        type: 'string',
        required: false,
        choices: {
          sales: 'Sales',
          support: 'Support',
          recovery: 'Recovery',
          billing: 'Billing',
          security: 'Security',
          passes: 'Passes',
          onboarding: 'Onboarding',
        },
        helpText: 'One class of alert; leave blank for every class.',
      },
      {
        key: 'q',
        label: 'Search',
        type: 'string',
        required: false,
        helpText: 'Words a title or body must contain; leave blank for every entry.',
      },
      { key: 'limit', label: 'Limit', type: 'integer', required: false, default: '50' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const params: Record<string, unknown> = {};

      if (bundle.inputData.unread === true || bundle.inputData.unread === 'true') params.unread = 1;
      if (bundle.inputData.class) params.class = bundle.inputData.class;
      if (bundle.inputData.q) params.q = bundle.inputData.q;
      params.per_page = Math.min(Number(bundle.inputData.limit ?? 50), 100);

      const response = await z.request({
        url: `${apiBaseUrl()}/me/notifications`,
        params,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
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
} satisfies Search;
