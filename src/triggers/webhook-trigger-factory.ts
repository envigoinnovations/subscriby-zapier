import { Trigger, ZObject, Bundle } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

/**
 * Shape of a webhook event delivered by MemberPass. Matches the
 * envelope documented at https://docs.memberpass.net/webhooks/index.
 */
interface MemberPassEvent {
  id: string;
  type: string;
  created_at: string;
  api_version: string;
  project_id: string | null;
  data: Record<string, unknown>;
}

interface TriggerDefinitionInput {
  key: string;
  noun: string;
  label: string;
  description: string;
  event: string;
  sample: MemberPassEvent;
}

/**
 * Builds a Zapier instant trigger that subscribes to a single
 * MemberPass webhook event. Callers supply the event name, a sample
 * payload Zapier shows during Zap setup, and UI strings.
 */
export const defineWebhookTrigger = (input: TriggerDefinitionInput): Trigger => ({
  key: input.key,
  noun: input.noun,
  display: {
    label: input.label,
    description: input.description,
  },
  operation: {
    type: 'hook',
    perform: async (z: ZObject, bundle: Bundle) => {
      const event = bundle.cleanedRequest as MemberPassEvent;

      return [
        {
          id: event.id,
          type: event.type,
          created_at: event.created_at,
          project_id: event.project_id,
          data: event.data,
        },
      ];
    },
    performSubscribe: async (z: ZObject, bundle: Bundle) => {
      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-subscriptions`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': `${bundle.meta?.zap?.id ?? 'zap'}-${input.event}-subscribe`,
        },
        json: {
          name: `Zapier — ${input.label}`,
          url: bundle.targetUrl,
          events: [input.event],
        },
      });

      handleHttpError(response, z);

      const body = response.data as { data?: { id: string }; secret?: string };

      if (!body?.data?.id) {
        throw new z.errors.Error('MemberPass did not return a webhook endpoint id.');
      }

      return { id: body.data.id, secret: body.secret };
    },
    performUnsubscribe: async (z: ZObject, bundle: Bundle) => {
      const endpointId = bundle.subscribeData?.id as string | undefined;

      if (!endpointId) {
        return {};
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-subscriptions/${endpointId}`,
        method: 'DELETE',
        headers: {
          'Idempotency-Key': `${bundle.meta?.zap?.id ?? 'zap'}-${input.event}-unsubscribe`,
        },
      });

      if (response.status >= 400 && response.status !== 404) {
        handleHttpError(response, z);
      }

      return {};
    },
    performList: async (z: ZObject, bundle: Bundle) => {
      const response = await z.request({
        url: `${apiBaseUrl()}/webhook-events`,
        params: {
          type: input.event,
          limit: 3,
        },
      });

      handleHttpError(response, z);

      const body = response.data as { data?: MemberPassEvent[] };
      const events = Array.isArray(body?.data) ? body.data : [];

      return events.map((event) => ({
        id: event.id,
        type: event.type,
        created_at: event.created_at,
        project_id: event.project_id,
        data: event.data,
      }));
    },
    sample: {
      id: input.sample.id,
      type: input.sample.type,
      created_at: input.sample.created_at,
      project_id: input.sample.project_id,
      data: input.sample.data,
    },
  },
});
