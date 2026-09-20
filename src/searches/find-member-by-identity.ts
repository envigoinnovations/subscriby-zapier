import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'find_member_by_identity',
  noun: 'Member',
  display: {
    label: 'Find Member by Connector Account',
    description:
      "Look up a project member by the account they connected on a connector: the connector and the platform's own id for the account, as a bot or a server hands it over.",
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
      { key: 'connector', label: 'Connector', type: 'string', required: true, dynamic: 'dropdown_connectors.id.name', helpText: 'The connector the account lives on.' },
      { key: 'external_id', label: 'Account ID', type: 'string', required: true, helpText: "The platform's own id for the account, as List Member Identities shows it." },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const connector = bundle.inputData.connector as string;
      const externalId = bundle.inputData.external_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/members`,
        params: { identity: `${connector}:${externalId}` },
      });

      handleHttpError(response, z);

      return (response.data as { data?: Array<Record<string, unknown>> }).data ?? [];
    },
    sample: {
      id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
      status: 'customer',
      identities: [{ connector: 'telegram', external_id: '123456789', preferred: true }],
    },
  },
} satisfies Search;
