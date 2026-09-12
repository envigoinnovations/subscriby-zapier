import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'mark_all_notifications_read',
  noun: 'Notification',
  label: 'Mark All Notifications Read',
  description:
    'Mark every unread entry of your notification centre as read in one call and learn how many were marked. Running it again marks nothing and answers 0.',
  inputFields: [],
  path: () => '/me/notifications/read-all',
  sample: {
    marked: 3,
  },
});
