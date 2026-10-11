import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_link_funnel',
  noun: 'Smart Link Funnel',
  display: {
    label: 'Get Smart Link Funnel',
    description:
      'Read the funnel behind Smart Links: lifetime clicks, the members a link brought, those who started a purchase, those who paid, the conversion rate and everything those members ever paid, per currency and in US dollars. With a Smart Link ID, one link\'s row; without, every link of the project plus the Direct row and totals that add up to the project\'s own figures.',
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
        required: false,
        helpText: 'UUID of one link for its row alone. Leave blank for every link with the Direct row and the totals.',
      },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const linkId = bundle.inputData.link_id as string | undefined;

      if (linkId) {
        const one = await z.request({
          url: `${apiBaseUrl()}/projects/${projectId}/links/${linkId}/funnel`,
        });

        handleHttpError(one, z);

        const row = (one.data as { data?: Record<string, unknown> }).data;

        return row ? [row] : [];
      }

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/links/funnel`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [{ id: projectId, ...data }] : [];
    },
    sample: {
      id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      links: [
        {
          link_id: '7c2e5a90-3f41-4b8d-9e62-1a0d4c8b7f35',
          name: 'YouTube description',
          slug: 'youtube',
          archived: false,
          clicks: 42,
          leads: 9,
          checkouts: 4,
          paid: 3,
          conversion_rate: 7.14,
          revenue: { usd: '36.00', by_currency: [{ currency_id: '6e2b1c4a-8d3f-4a9b-9c7e-2f1d3a5b7c9e', currency: 'USD', amount: '36.00' }] },
        },
      ],
      direct: {
        link_id: null,
        name: 'Direct',
        slug: null,
        archived: false,
        clicks: 0,
        leads: 120,
        checkouts: 61,
        paid: 55,
        conversion_rate: 0,
        revenue: { usd: '660.00', by_currency: [{ currency_id: '6e2b1c4a-8d3f-4a9b-9c7e-2f1d3a5b7c9e', currency: 'USD', amount: '660.00' }] },
      },
      totals: { clicks: 42, leads: 129, checkouts: 65, paid: 58, revenue_usd: '696.00' },
    },
  },
} satisfies Search;
