import { ZObject, Bundle, Search } from "zapier-platform-core";
import { apiBaseUrl, handleHttpError } from "../utils/http";

export default {
	key: "get_bot_link",
	noun: "Bot Link",
	display: {
		label: "Get Bot Link",
		description:
			"Retrieve the shareable Telegram bot deep link (t.me/…) for a project.",
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
		],
		async perform(z: ZObject, bundle: Bundle) {
			const projectId = bundle.inputData.project_id as string;

			const response = await z.request({
				url: `${apiBaseUrl()}/projects/${projectId}/distribution/bot-link`,
			});

			handleHttpError(response, z);

			const data = (response.data as { data?: Record<string, unknown> })
				.data;

			return data ? [data] : [];
		},
		sample: {
			url: "https://t.me/research_premium_bot",
		},
	},
} satisfies Search;
