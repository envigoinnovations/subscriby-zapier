import { ZObject, Bundle, Search } from "zapier-platform-core";
import { apiBaseUrl, handleHttpError } from "../utils/http";

export default {
	key: "get_deep_link",
	noun: "Deep Link",
	display: {
		label: "Get Deep Link",
		description:
			"Generate a deep link for a project. Pass at most one of access_code, plan_id, or custom — omit all to get the default project link.",
	},
	operation: {
		inputFields: [
			{
				key: "project_id",
				label: "Project ID",
				type: "string",
				required: true,
				dynamic: "dropdown_projects.id.name",
				altersDynamicFields: true,
			},
			{
				key: "access_code",
				label: "Access Code",
				type: "string",
				required: false,
				helpText: "Optional unredeemed access code to pre-fill.",
			},
			{
				key: "plan_id",
				label: "Plan ID",
				type: "string",
				required: false,
				helpText: "Optional plan UUID to pre-select.",
				dynamic: "dropdown_plans.id.name",
			},
			{
				key: "custom",
				label: "Custom Payload",
				type: "string",
				required: false,
				helpText:
					"Optional custom payload passed through as the bot start parameter.",
			},
		],
		async perform(z: ZObject, bundle: Bundle) {
			const projectId = bundle.inputData.project_id as string;
			const params: Record<string, unknown> = {};

			if (bundle.inputData.access_code)
				params.access_code = bundle.inputData.access_code;
			if (bundle.inputData.plan_id)
				params.plan_id = bundle.inputData.plan_id;
			if (bundle.inputData.custom)
				params.custom = bundle.inputData.custom;

			const response = await z.request({
				url: `${apiBaseUrl()}/projects/${projectId}/distribution/deep-link`,
				params,
			});

			handleHttpError(response, z);

			const data = (response.data as { data?: Record<string, unknown> })
				.data;

			return data ? [data] : [];
		},
		sample: {
			url: "https://t.me/research_premium_bot?start=abc123",
		},
	},
} satisfies Search;
