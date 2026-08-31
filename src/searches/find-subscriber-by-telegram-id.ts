import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_subscriber_by_telegram_id',
  noun: 'Member',
  display: {
    label: 'Find Subscriber by Telegram ID',
    description: 'Look up a project member by their Telegram user ID.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'telegram_user_id', label: 'Telegram User ID', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const telegramId = bundle.inputData.telegram_user_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/members`,
        params: { 'filter[telegram_user_id]': telegramId },
      });

      handleHttpError(response, z);

      const members = ((response.data as { data?: unknown[] }).data ?? []) as Array<{
        telegram_user_id: string;
      }>;

      return members.filter((row) => String(row.telegram_user_id) === String(telegramId));
    },
    sample: {
      id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      telegram_user_id: '123456789',
      status: 'customer',
    },
  },
} satisfies Search;