import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'remind_pass_window_queue',
  noun: 'Pass Window',
  label: 'Remind Pass Window Queue',
  description:
    'Nudge everyone who bought a window but has not sent their Telegram join request yet, re-attaching their invite links. Answers with how many holders Telegram accepted the message for; a window that has ended or been cancelled reminds nobody. This messages real people — do not repeat it within the same window.',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'window_id', label: 'Window ID', type: 'string', required: true, helpText: 'UUID of the pass window; find it with Find Pass Windows.' },
  ],
  path: (input) => `/projects/${input.project_id}/pass-windows/${input.window_id}/remind`,
  sample: { window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738', reminded: 4 },
});
