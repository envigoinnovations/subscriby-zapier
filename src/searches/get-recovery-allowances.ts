import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_recovery_allowances',
  noun: 'Recovery Allowance',
  display: {
    label: 'Get Recovery Allowances',
    description:
      'Retrieve how many self-service Disaster Recoveries of each kind the creator the token acts for may still run, what support has released on top, and when the allowance returns.',
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
        url: `${apiBaseUrl()}/recovery/allowances`,
      });

      handleHttpError(response, z);

      const body = response.data as { data?: Record<string, unknown>[]; meta?: Record<string, unknown> };
      const meta = body.meta ?? {};

      return (body.data ?? []).map((row) => ({ ...row, ...meta }));
    },
    sample: {
      kind: 'resources',
      kind_label: 'Channels & Groups',
      self_service_remaining: 0,
      grant_remaining: 1,
      remaining: 1,
      allowed: true,
      uses_grant: true,
      last_used_at: '2026-09-12T03:19:10+00:00',
      next_self_service_at: '2026-12-11T03:19:10+00:00',
      window_days: 90,
      self_service_uses: 1,
    },
  },
} satisfies Search;
