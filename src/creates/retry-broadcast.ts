import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'retry_broadcast',
  noun: 'Broadcast',
  label: 'Retry Broadcast',
  description:
    'Send a finished broadcast again to the members it could not reach and nobody else, as a new broadcast under the old one. A broadcast still sending, one that missed nobody, or one whose missed members cannot be reached now is refused with the reason. A member who blocked the bot is missed again; a retry is for the rate-limited and the temporary errors.',
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'broadcast_id', label: 'Broadcast ID', type: 'string', required: true, helpText: 'UUID of the finished broadcast; find it with Find Broadcasts, filtered to Completed or Failed.' },
  ],
  path: (input) => `/projects/${input.project_id}/broadcasts/${input.broadcast_id}/retry`,
  sample: {
    broadcast_id: '0192f4a6-9b1c-7e3d-8a2f-6c7d8e9f0a1b',
    parent_id: '0192f4a6-3c1e-7d2b-9a8f-4e5d6c7b8a90',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    audience: 'customer',
    recipient_estimate: 2,
    estimated_seconds: 1,
    status: 'queued',
  },
});
