import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'create_webhook_endpoint',
  noun: 'Webhook Endpoint',
  display: {
    label: 'Create Webhook Endpoint',
    description:
      'Register a new webhook endpoint. The one-time plaintext signing secret is returned on creation and is exposed as the "secret" output field — store it now, it will not be shown again.',
  },
  operation: {
    inputFields: [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        required: true,
        helpText: 'Human-readable label for the endpoint.',
      },
      {
        key: 'url',
        label: 'URL',
        type: 'string',
        required: true,
        helpText: 'HTTPS URL that will receive webhook deliveries.',
      },
      {
        key: 'events',
        label: 'Events',
        type: 'string',
        required: true,
        list: true,
        helpText: 'List of event names to subscribe to (e.g. subscription.created, payment.succeeded). Use * to subscribe to all events.',
      },
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: false,
        helpText: 'Optional UUID of the project to scope deliveries to. Omit for team-wide delivery.',
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      {
        key: 'allowed_ips',
        label: 'Allowed IPs',
        type: 'string',
        required: false,
        list: true,
        helpText: 'Optional list of CIDR ranges / IPs allowed to receive deliveries.',
      },
      {
        key: 'is_active',
        label: 'Active',
        type: 'boolean',
        required: false,
        helpText: 'Defaults to true. Set false to register but pause deliveries.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const body: Record<string, unknown> = {
        name: bundle.inputData.name,
        url: bundle.inputData.url,
        events: bundle.inputData.events,
      };

      const passthrough: Array<keyof typeof bundle.inputData> = [
        'project_id',
        'allowed_ips',
        'is_active',
      ];

      for (const key of passthrough) {
        const value = bundle.inputData[key];
        if (value !== undefined && value !== null && value !== '') {
          body[key as string] = value;
        }
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-endpoints`,
        method: 'POST',
        body,
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      const envelope = response.data as { data?: Record<string, unknown>; secret?: string };

      return {
        ...(envelope.data ?? {}),
        secret: envelope.secret,
      };
    },
    sample: {
      id: 'c62a08f4-1b7d-4e35-9860-a37f5d21e0b9',
      name: 'Zapier — All Events',
      url: 'https://hooks.zapier.com/hooks/catch/1/abc123/',
      events: ['subscription.created', 'payment.succeeded'],
      is_active: true,
      secret: 'whsec_example_value_shown_once_only',
    },
  },
} satisfies Create;
