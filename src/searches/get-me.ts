import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_me',
  noun: 'Account',
  display: {
    label: 'Get Me',
    description:
      'Retrieve the creator the token belongs to: the team it is scoped to, every team held, plan capabilities, connected accounts and alert destinations.',
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
        url: `${apiBaseUrl()}/me`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      locale: 'en',
      email_verified: true,
      plan: 'growth',
      capabilities: {
        no_branding: true,
        time_limited_passes: true,
        coupons: true,
        free_plans: true,
        teams: true,
        disaster_recovery_prevention: true,
      },
      current_team: {
        id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
        name: 'Creator Team',
        owner_user_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
        personal: true,
        created_at: '2026-05-18T10:05:00Z',
      },
      teams: [
        {
          id: 'a83f0d51-4c92-4b7e-8615-2fd9e70a3c86',
          name: 'Creator Team',
          owner_user_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
          personal: true,
          created_at: '2026-05-18T10:05:00Z',
        },
      ],
      identities: [],
      alert_destinations: [],
      alert_destinations_default: true,
      partner_code: null,
      partner_link: null,
      created_at: '2026-05-18T10:05:00Z',
    },
  },
} satisfies Search;
