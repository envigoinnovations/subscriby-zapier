import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'deactivate_resource',
  noun: 'Resource',
  label: 'Deactivate Resource',
  description:
    'Switch a resource off without deleting it. It keeps its Telegram link but drops out of what plans grant until switched back on. Deactivating a resource that is already off changes nothing.',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'resource_id', label: 'Resource ID', type: 'string', required: true, dynamic: 'dropdown_resources.id.name' },
  ],
  path: (input) => `/projects/${input.project_id}/resources/${input.resource_id}/deactivate`,
  sample: {
    id: '8c2f4a61-3d7e-4b90-a5c8-1e6f9d0b2c73',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    type: 'supergroup',
    title: 'Members lounge',
    description: null,
    chat_id: '-1001234567890',
    active: false,
    created_at: '2026-05-18T10:05:00Z',
    updated_at: '2026-09-06T09:20:00Z',
  },
});
