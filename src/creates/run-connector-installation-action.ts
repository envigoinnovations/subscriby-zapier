import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'run_connector_installation_action',
  noun: 'Installation Action',
  display: {
    label: 'Run Connector Installation Action',
    description:
      "Have a project's installation of a connector do one of the things it offers, on its platform (set up a members area, for example). The answers are checked against the fields the action declares, and the result says what happened in the creator's words: done with a message and whatever the connector reports, or refused with the reason. This changes the platform itself, so run an action that asks for confirmation only when the creator has agreed.",
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'connector', label: 'Installed Connector', type: 'string', required: true, dynamic: 'dropdown_connector_installations.connector.display_name', altersDynamicFields: true },
      {
        key: 'action',
        label: 'Action',
        type: 'string',
        required: true,
        dynamic: 'dropdown_installation_actions.id.label',
        helpText: 'The action key, as List Connector Installation Actions lists it.',
      },
      {
        key: 'fields',
        label: 'Answers',
        dict: true,
        required: false,
        helpText: 'The answers to the fields the action asks for, keyed by field name as List Connector Installation Actions lists them; leave empty for an action that asks nothing.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const connector = String(bundle.inputData.connector ?? '');
      const action = String(bundle.inputData.action ?? '');
      const fields = (bundle.inputData.fields ?? {}) as Record<string, unknown>;
      const body: Record<string, unknown> = {};

      if (Object.keys(fields).length > 0) {
        body.fields = fields;
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/connectors/${encodeURIComponent(connector)}/installation/actions/${encodeURIComponent(action)}`,
        method: 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
        body,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
    },
    sample: {
      action: 'setup_members_area',
      done: true,
      message: 'The members area is ready: a Members category with #members, #announcements and a voice channel, behind the Members role.',
      details: {
        category_id: '1183455190821797800',
        role_id: '1183455190821797899',
        channel_ids: ['1183455190821797801', '1183455190821797802', '1183455190821797803'],
      },
      failure: null,
    },
  },
} satisfies Create;
