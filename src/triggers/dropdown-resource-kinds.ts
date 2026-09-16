import { ZObject, Bundle, Trigger } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

type InstallationRow = {
  connector: string;
  role?: string;
  state?: string;
};

type KindRow = {
  kind: string;
  label?: string;
};

type ConnectorRow = {
  key: string;
  name?: string;
  resource_kinds?: KindRow[];
};

export default {
  key: 'dropdown_resource_kinds',
  noun: 'Resource Kind',
  display: {
    label: 'New Resource Kind (Dropdown)',
    description:
      "Powers the Kind dropdown of Request Resource Link: the kinds of place the chosen project's connected connectors gate, spelled connector:kind, from the live Connectors Marketplace.",
    hidden: true,
  },
  operation: {
    type: 'polling' as const,
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string' as const, required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    ],
    perform: async (z: ZObject, bundle: Bundle) => {
      const projectId = bundle.inputData.project_id as string | undefined;
      if (!projectId) {
        return [];
      }

      const installations = await z.request({ url: `${apiBaseUrl()}/projects/${projectId}/connectors` });
      handleHttpError(installations, z);

      const connected = new Set(
        ((installations.data as { data?: InstallationRow[] }).data ?? [])
          .filter((row) => row.role === 'live' && row.state === 'connected')
          .map((row) => row.connector),
      );

      if (connected.size === 0) {
        return [];
      }

      const catalogue = await z.request({ url: `${apiBaseUrl()}/connectors` });
      handleHttpError(catalogue, z);

      return ((catalogue.data as { data?: ConnectorRow[] }).data ?? [])
        .filter((connector) => connected.has(connector.key))
        .flatMap((connector) =>
          (connector.resource_kinds ?? []).map((kind) => ({
            id: `${connector.key}:${kind.kind}`,
            name: `${connector.name ?? connector.key} ${kind.label ?? kind.kind}`,
            connector: connector.key,
            kind: kind.kind,
            label: kind.label ?? kind.kind,
          })),
        );
    },
    sample: {
      id: 'telegram:channel',
      name: 'Telegram Channel',
      connector: 'telegram',
      kind: 'channel',
      label: 'Channel',
    },
  },
} satisfies Trigger;
