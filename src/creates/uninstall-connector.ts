import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'uninstall_connector',
  noun: 'Connector Installation',
  display: {
    label: 'Uninstall Connector',
    description:
      "Uninstall a connector from a project: every live grant on its resources is revoked, its resources are deactivated as detached, the installation row is kept and identities are never removed. Two opt-ins, on by default, act on the plans left with nothing to grant: take them off sale, and cancel their recurring subscriptions at period end with an email to each member. Run Get Connector Uninstall Preview first.",
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'connector', label: 'Installed Connector', type: 'string', required: true, dynamic: 'dropdown_connector_installations.connector.display_name' },
      { key: 'unpublish_emptied_plans', label: 'Unpublish Emptied Plans', type: 'boolean', required: false, default: 'true', helpText: 'Take the plans left with nothing to grant off sale.' },
      { key: 'cancel_recurring_subscriptions', label: 'Cancel Recurring Subscriptions', type: 'boolean', required: false, default: 'true', helpText: 'Cancel the live recurring subscriptions on those plans at the end of their paid period and email each member. One-time purchases are never cancelled.' },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const connector = bundle.inputData.connector as string;
      const body: Record<string, unknown> = {};

      if (bundle.inputData.unpublish_emptied_plans !== undefined && bundle.inputData.unpublish_emptied_plans !== '') body.unpublish_emptied_plans = bundle.inputData.unpublish_emptied_plans;
      if (bundle.inputData.cancel_recurring_subscriptions !== undefined && bundle.inputData.cancel_recurring_subscriptions !== '') body.cancel_recurring_subscriptions = bundle.inputData.cancel_recurring_subscriptions;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/connectors/${encodeURIComponent(connector)}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
        body,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ?? {};
    },
    sample: {
      installation: { id: '3b8f0c6e-2d41-4a97-9e5f-1c7d6b2a8e40', connector: 'discord', state: 'disconnected', operational: false },
      connector: 'discord',
      grants_revoked: 41,
      resources_detached: 2,
      plans_unpublished: 1,
      subscriptions_cancelled: 17,
      members_notified: 17,
    },
  },
} satisfies Create;
