import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from './http';

type InputFields = Create['operation']['inputFields'];

interface RpcCreateInput {
  key: string;
  noun: string;
  label: string;
  description: string;
  /** Defaults to POST; the delete verbs pass DELETE. */
  method?: 'POST' | 'DELETE';
  inputFields: InputFields;
  /** Builds the path under the v1 base from the Zap's input. */
  path: (input: Record<string, unknown>) => string;
  /** Builds the optional JSON body from the Zap's input; nothing is sent when it answers undefined. */
  body?: (input: Record<string, unknown>) => Record<string, unknown> | undefined;
  /** What Zapier shows when the API answers 204 with no body. */
  emptyResult?: (input: Record<string, unknown>) => Record<string, unknown>;
  sample: Record<string, unknown>;
}

/**
 * Builds a Zapier create for a Subscriby verb that takes no body, or a small
 * optional one: the activate / deactivate / pause / resume / reopen / block
 * style RPC routes, the pass-window cancel and the DELETE routes. Every mutation carries a fresh Idempotency-Key, and a
 * `meta` block (the pass-window cancel tallies) is folded onto the row so a
 * Zap can read it.
 */
export const defineRpcCreate = (input: RpcCreateInput): Create => ({
  key: input.key,
  noun: input.noun,
  display: {
    label: input.label,
    description: input.description,
  },
  operation: {
    inputFields: input.inputFields,
    async perform(z: ZObject, bundle: Bundle) {
      const payload = input.body ? input.body(bundle.inputData) : undefined;

      const response = await z.request({
        url: `${apiBaseUrl()}${input.path(bundle.inputData)}`,
        method: input.method ?? 'POST',
        headers: { 'Idempotency-Key': randomUUID() },
        ...(payload ? { body: payload } : {}),
      });

      handleHttpError(response, z);

      const body = response.data as { data?: Record<string, unknown>; meta?: Record<string, unknown> } | undefined;

      if (response.status === 204 || !body || typeof body !== 'object') {
        return input.emptyResult ? input.emptyResult(bundle.inputData) : { deleted: true };
      }

      if (body.data && typeof body.data === 'object') {
        return body.meta ? { ...body.data, meta: body.meta } : body.data;
      }

      return body as Record<string, unknown>;
    },
    sample: input.sample,
  },
});
