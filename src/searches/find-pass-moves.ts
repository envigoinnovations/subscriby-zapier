import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_pass_moves',
  noun: 'Pass Move',
  display: {
    label: 'Find Pass Moves',
    description:
      "List every hop one purchase's passes made, oldest first, from the project's pass move log: a date cancelled and the holder rolled forward, a season date replaced by another, or a payment that settled after its date and was bound to the next one. Each hop names both dates by ID and as a person reads them, the reason, who made it and when; the ledger keeps only a pass's last move, the log keeps them all.",
  },
  operation: {
    inputFields: [
      {
        key: 'subscription_id',
        label: 'Subscription ID',
        type: 'string',
        required: true,
        helpText: 'The purchase whose passes moved, as Pass Holder Moved or Find Pass Roster Rows name it.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const subscriptionId = bundle.inputData.subscription_id as string;

      if (!subscriptionId) {
        return [];
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/subscriptions/${subscriptionId}/pass-moves`,
      });

      handleHttpError(response, z);

      return (response.data as { data?: Record<string, unknown>[] }).data ?? [];
    },
    sample: {
      id: '0f9e8d7c-6b5a-4f3e-9d2c-1b0a9f8e7d6c',
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      claim_id: 'c1f2e3d4-5a6b-4c7d-8e9f-0a1b2c3d4e5f',
      from_window_id: '9c1f4e27-5a8b-4d63-b2e0-8f7a6c5d4e31',
      from_local_range: 'Thu 5 Nov 2026, 15:30 – Fri 6 Nov, 00:00 CST',
      to_window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
      to_local_range: 'Thu 12 Nov 2026, 15:30 – Fri 13 Nov, 00:00 CST',
      reason: 'window_cancelled',
      moved_by_user_id: '6a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d',
      moved_by_name: 'Aaron',
      moved_at: '2026-11-06T09:15:02Z',
    },
  },
} satisfies Search;
