import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_recovery_readiness',
  noun: 'Recovery Readiness',
  display: {
    label: 'Get Recovery Readiness',
    description:
      'Retrieve the Disaster Recovery readiness checklist for the creator the token acts for: every line with its state, whether the plan locks it, and the totals.',
  },
  operation: {
    inputFields: [
      {
        key: 'refresh',
        label: 'Refresh',
        type: 'boolean',
        required: false,
        helpText: 'Ignored — present because Zapier requires every search to accept at least one input field. Leave blank.',
      },
    ],
    async perform(z: ZObject, _bundle: Bundle) {
      const response = await z.request({
        url: `${apiBaseUrl()}/recovery/readiness`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      prevention: true,
      completed: 4,
      total: 6,
      complete: false,
      items: [
        {
          key: 'second_factor',
          label: 'Two-Factor Authentication or a Passkey',
          description: 'Recovery moves your identity, so the account that runs it should be hard to take over.',
          icon: 'shield-check',
          prevention: false,
          reminder: false,
          done: true,
          locked: false,
          detail: 'Enabled',
          url: 'https://app.subscriby.net/settings/security',
        },
        {
          key: 'off_platform_copy',
          label: 'A Copy of Your Content Outside Telegram',
          description: 'Nothing can be read from a banned channel afterwards. Keep your files and posts somewhere Telegram cannot take away.',
          icon: 'archive-box',
          prevention: false,
          reminder: true,
          done: null,
          locked: false,
          detail: '',
          url: null,
        },
      ],
    },
  },
} satisfies Search;
