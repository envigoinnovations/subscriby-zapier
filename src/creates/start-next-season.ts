import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'start_next_season',
  noun: 'Plan',
  label: 'Start Next Season',
  description:
    "Create the successor of a pass series plan: a new season built from the same series, carrying its rules onto the next run of windows, so a season ticket can be sold again without re-authoring it. The current season is untouched. Only a plan of kind pass_series has a successor; any other kind is refused.",
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'plan_id', label: 'Series Plan ID', type: 'string', required: true, dynamic: 'dropdown_plans.id.name', helpText: 'The pass_series plan whose next season to start.' },
  ],
  path: (input) => `/projects/${input.project_id}/plans/${input.plan_id}/successor`,
  sample: {
    id: 'e4b1c7d9-2f58-4a63-b0e7-9c3d5a8f1b26',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    name: 'Autumn season',
    kind: 'pass_series',
    active: false,
    created_at: '2026-09-06T09:20:00Z',
  },
});
