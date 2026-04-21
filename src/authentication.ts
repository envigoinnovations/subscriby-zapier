import { Authentication, ZObject, Bundle } from "zapier-platform-core";
import { apiBaseUrl, handleHttpError } from "./utils/http";

/**
 * Validates the pasted API key by fetching the team the token is
 * scoped to. The response doubles as the connection label shown in
 * the Zapier UI so users can tell which MemberPass team the Zap is
 * wired to.
 */
const testAuthentication = async (z: ZObject, bundle: Bundle) => {
	const response = await z.request({
		url: `${apiBaseUrl()}/teams/current`,
		method: "GET",
	});

	handleHttpError(response, z);

	const data = response.data as { data?: { id: string; name: string } };

	if (!data?.data?.id) {
		throw new z.errors.Error(
			"Unexpected response shape from /v1/teams/current — contact MemberPass support.",
			"UnexpectedResponse",
			response.status,
		);
	}

	return data.data;
};

export const authentication: Authentication = {
	type: "custom",
	test: testAuthentication,
	connectionLabel: async (_z, bundle) =>
		`MemberPass — ${(bundle.inputData.name as string) ?? "team"}`,
	fields: [
		{
			key: "api_key",
			label: "API token",
			type: "password",
			required: true,
			helpText:
				"Paste a token minted at https://app.memberpass.net/settings/tokens. Tokens start with `mpt_`. Grant at minimum the `team:view` ability plus the abilities matching the triggers / actions you plan to use.",
		},
	],
};
