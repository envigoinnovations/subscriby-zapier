import { ZObject, Bundle, Create } from 'zapier-platform-core';
import { randomUUID } from 'node:crypto';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'archive_link',
  noun: 'Smart Link',
  display: {
    label: 'Archive Smart Link',
    description:
      'Put a Smart Link out of use. It stops counting clicks and crediting members; its address keeps landing on the portal home, so a flyer or a bio that carries it never shows anyone an error, and the members, purchases and revenue it brought keep their figures. Cannot be undone — make a new link instead.',
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        label: 'Project ID',
        type: 'string',
        required: true,
        dynamic: 'dropdown_projects.id.name',
        altersDynamicFields: true,
      },
      {
        key: 'link_id',
        label: 'Smart Link ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the link to archive. Find it with Find Smart Links.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const linkId = bundle.inputData.link_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/links/${linkId}`,
        method: 'DELETE',
        headers: { 'Idempotency-Key': randomUUID() },
      });

      handleHttpError(response, z);

      return { id: linkId, archived: true };
    },
    sample: {
      id: '7c2e5a90-3f41-4b8d-9e62-1a0d4c8b7f35',
      archived: true,
    },
  },
} satisfies Create;
