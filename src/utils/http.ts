import { BeforeRequestMiddleware, ZObject } from "zapier-platform-core";

/**
 * Base URL for the MemberPass public REST API. Overridable via the
 * MEMBERPASS_API_URL environment variable so CI / staging pushes can
 * target a non-production host.
 */
export const apiBaseUrl = (): string =>
	process.env.MEMBERPASS_API_URL?.replace(/\/$/, "") ??
	"https://api.memberpass.net/v1";

/**
 * Adds the Bearer token header to every outbound request Zapier makes.
 */
export const addAuthHeader: BeforeRequestMiddleware = (request, _z, bundle) => {
	const token = bundle.authData?.api_key as string | undefined;

	if (!token) {
		return request;
	}

	request.headers = {
		...(request.headers ?? {}),
		Authorization: `Bearer ${token}`,
		"User-Agent": "MemberPass-Zapier/1.0.0",
	};

	return request;
};

/**
 * Wraps 4xx/5xx responses coming back from the API so Zapier surfaces
 * the MemberPass ApiErrorCode envelope to the user building a Zap
 * instead of a generic HTTP error.
 */
export const handleHttpError = (
	response: { status: number; data: unknown },
	z: ZObject,
) => {
	if (response.status < 400) {
		return response;
	}

	const envelope = response.data as
		| {
				error?: {
					code?: string;
					message?: string;
					docs_url?: string;
					remediation?: string;
				};
		  }
		| undefined;

	const parts: string[] = [];
	if (envelope?.error?.code) parts.push(envelope.error.code);
	if (envelope?.error?.message) parts.push(envelope.error.message);
	if (envelope?.error?.remediation)
		parts.push(`→ ${envelope.error.remediation}`);
	if (envelope?.error?.docs_url)
		parts.push(`Docs: ${envelope.error.docs_url}`);

	throw new z.errors.Error(
		parts.length > 0 ? parts.join(" | ") : `HTTP ${response.status}`,
		envelope?.error?.code ?? "HttpError",
		response.status,
	);
};
