import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_team',
  noun: 'Team',
  display: {
    label: 'Create Team',
    description:
      'Create a Subscriby team. Teams are the tenant every project, plan and subscription belongs to, and are a Growth-tier feature — a lower tier returns TEAM_TIER_REQUIRED. The token owner becomes the team owner.',
  },
  operation: {
    inputFields: [
      { key: 'name', label: 'Name', type: 'string', required: true, helpText: 'Team name, up to 255 characters.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const response = await z.request({
        url: `${apiBaseUrl()}/teams`,
        method: 'POST',
        body: { name: bundle.inputData.name },
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      id: '01HXTEAMSAMPLE0000000000000',
      name: 'Agency Team',
      owner_user_id: '01HXUSERSAMPLE0000000000000',
      personal: false,
    },
  },
} satisfies Create;
