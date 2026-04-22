import { ZObject, Bundle, Search } from 'zapier-platform-core';
import { apiBaseUrl, handleHttpError } from '../utils/http';

export default {
  key: 'get_payment_method',
  noun: 'Payment Method',
  display: {
    label: 'Get Payment Method',
    description: 'Retrieve a single project payment method by UUID.',
  },
  operation: {
    inputFields: [
      { key: 'project_id', label: 'Project ID', type: 'string', required: true },
      { key: 'method_id', label: 'Method ID', type: 'string', required: true },
    ],
    async perform(z: ZObject, bundle: Bundle) {
      const projectId = bundle.inputData.project_id as string;
      const methodId = bundle.inputData.method_id as string;

      const response = await z.request({
        url: `${apiBaseUrl()}/projects/${projectId}/payment-methods/${methodId}`,
      });

      handleHttpError(response, z);

      const data = (response.data as { data?: Record<string, unknown> }).data;

      return data ? [data] : [];
    },
    sample: {
      id: 'pmt_01HXPAYMENTMETHODSAMPLE0000',
      provider: 'stripe',
      status: 'active',
    },
  },
} satisfies Search;
