import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'update_support_settings',
  noun: 'Support Settings',
  display: {
    label: 'Update Support Settings',
    description:
      "Change a project's support inbox settings. Partial: only the fields you fill in change. Turning support off stops new member threads reaching the inbox; existing threads are kept.",
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      { key: 'enabled', label: 'Support Enabled', type: 'boolean', required: false, helpText: 'Whether members can open support threads with the bot.' },
      {
        key: 'relay_mode',
        label: 'Relay Mode',
        type: 'string',
        required: false,
        choices: { none: 'Inbox only', owner_dm: 'Also forward to the creator on Telegram' },
        helpText: 'Where new threads go besides the dashboard inbox.',
      },
      { key: 'agent_name', label: 'Agent Name', type: 'string', required: false, helpText: 'The name members see on replies, up to 60 characters. Leave blank to keep the stored name.' },
      { key: 'auto_reply', label: 'Auto Reply', type: 'text', required: false, helpText: 'Sent automatically when a member opens a thread, up to 1,000 characters. Leave blank to keep the stored text.' },
      { key: 'notify_email', label: 'Notify by Email', type: 'boolean', required: false, helpText: 'Whether the creator is emailed about new threads.' },
      {
        key: 'copilot_answers',
        label: 'Copilot Answers Members',
        type: 'boolean',
        required: false,
        helpText:
          "Whether Subscriby Copilot answers members' own-subscription questions and what the project's Knowledge covers in the inbox and the project bot, marked as automated. Everything else still waits for a person.",
      },
      {
        key: 'copilot_portal',
        label: 'Copilot on the Portal Page',
        type: 'boolean',
        required: false,
        helpText: "Whether a signed-in member finds the same Copilot in a chat on the project's portal page.",
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;

      const body: Record<string, unknown> = {};

      for (const key of ['enabled', 'relay_mode', 'agent_name', 'auto_reply', 'notify_email', 'copilot_answers', 'copilot_portal']) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/support/settings`,
        method: 'PATCH',
        headers: { 'Idempotency-Key': randomUUID(), 'Content-Type': 'application/json' },
        json: body,
      });

      handleHttpError(response, z);

      return (response.data as { data?: unknown }).data ?? response.data;
    },
    sample: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      enabled: true,
      relay_mode: 'owner_dm',
      agent_name: 'Team Subscriby',
      auto_reply: null,
      notify_email: true,
      copilot_answers: false,
      copilot_portal: false,
      updated_at: '2026-09-06T09:20:00Z',
    },
  },
} satisfies Create;
